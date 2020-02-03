const  http = require('http')
const express =require('express')
var mongoose = require('mongoose');
const app =express();
var UserModel = require('./User');
var bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');
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

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


const VerifyAuthentication = (req, res, next) => {
    let token = req.headers.authorization.split(' ');
    token = token[1];
    JWT.verify(token, 'Welcome to Nugen', function (err, decodedInfo) {
        if (err) {
            res.status(422).json({
                response: false,
                error: err.message
            });
        } else {
            req.body.decodedInfo = decodedInfo;
            next();
        }
    })
};



app.get('/users' ,VerifyAuthentication,async (req,res,next) => {

    try{
        let user = await UserModel.find({_id: req.body.decodedInfo.id})
        if(user){
            let usr= await UserModel.find({})
            if(usr){
                res.status(200).json({
                    response: true,
                    users: usr
                });
            }
        }
    }
    catch(err){
        res.status(422).json({
            response: false,
            error: err,
        });
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
            res.status(200).json({
                msg: 1,
                data: 'User has been inserted successfully',
                user: usr
            })
        }
    }
    catch(err){
        res.status(422).json({
            error: err,
            response: false
        });
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
                            res.status(200).json({
                                response: true,
                                token,
                                msg: "logged in successfully"
                            });
                        }
            }else{
                res.status(422).json({
                    response: false,
                    msg: "password is not correct"
                })
            }
        }else{
            res.status(422).json({
                response: false,
                msg: "phone is not correct"
            })
        }
    }
    catch(err){
            res.status(422).json({
                response: false,
                error:err,
                msg: "Wrong Phone/Password"
            });
    }
})


app.listen(3000,() => {
    console.log('server starts....')
})
