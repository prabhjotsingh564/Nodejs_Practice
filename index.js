const  http = require('http')
const express =require('express')
var mongoose = require('mongoose');
const app =express();
var UserModel = require('./app/model/User');
var bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');
const FUNCTION = require('./function');

//establish connection with mongodb database localhost
mongoose.connect('mongodb://localhost:27017/nodenew', {
            useNewUrlParser: true,
            useUnifiedTopology: true
    }).then(() => {
            console.log('Connection Established Successfully');
    }).catch(err => {
            console.log(err)
            console.log('Error While Establishing Connection');
    });


mongoose.set('useCreateIndex', true);
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


const VerifyAuthentication = (req, res, next) => {
   if(req.headers.authorization){     
    let token = req.headers.authorization.split(' ');
    token = token[1];
    JWT.verify(token, 'Welcome to Nugen', function (err, decodedInfo) {
        if (err) {
            const data={
                status:422,
                msg:" ",
                error:err.message
            }
            FUNCTION.error(data,res);
        } else {
            req.body.decodedInfo = decodedInfo;
            next();
        }
    })
   }else{
       const data ={
           status:422,
           msg:" ",
           error:"Authorization token is required"
       }
    FUNCTION.error(data,res);
   }
};



app.get('/users' ,VerifyAuthentication,async (req,res,next) => {

    try{
        let user = await UserModel.find({_id: req.body.decodedInfo.id})
        if(user){
            let usr= await UserModel.find({})
            if(usr){
                FUNCTION.success({
                    status:200,
                    msg:"users fetched successfully",
                    data:usr
                },res);
            }else{
                FUNCTION.error({
                    status:422,
                    msg:" ",
                    error:"users not found"
                },res);
            }
        }
    }
    catch(err){
       FUNCTION.error({
           status:422,
           msg:" ",
           error:err
       },res)
    }
})

//adding a new user to the data
app.post("/user" , async (req,res,next) => {
    try{
        let encrypedPass = await bcrypt.hash(req.body.password,10);
        req.body.password=encrypedPass;
        let user = new UserModel({...req.body});
        let usr = await user.save();
        if(usr){
            FUNCTION.success({
                status:200,
                msg:"users added successfully",
                data:usr
            },res);
        }
    }
    catch(err){
        FUNCTION.error({
            status:422,
            msg:" ",
            error:err
        },res);
    }
})

app.post('/login',async (req,res,next) => {
    try{
        let user= await UserModel.findOne({ phone: req.body.phone.toString() });
        if(user){
            let auth=await bcrypt.compare(req.body.password, user.password);
            if(auth){
                let token= await JWT.sign({
                        id: user._id,
                        phone: user.phone
                        }, 'Welcome to Nugen',{
                        expiresIn: '1d'
                        });
                        if(token){
                            FUNCTION.success({
                                status:200,
                                msg:"logged in successfully",
                                data:{token:token}
                            },res);
                        }
            }else{
                FUNCTION.error({
                    status:422,
                    msg:"password is not correct ",
                    error:" "
                },res);
            }
        }else{
            FUNCTION.error({
                status:422,
                msg:" phone is not correct",
                error:" "
            },res);
        }
    }
    catch(err){
        FUNCTION.error({
            status:422,
            msg:"Wrong Phone/Password",
            error:err
        },res);
    }
})


app.listen(3000,() => {
    console.log('server starts....')
})
