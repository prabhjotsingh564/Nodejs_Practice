const  http = require('http')
const express =require('express')
var mongoose = require('mongoose');
const app =express();
var UserModel = require('./User');
var bodyParser = require('body-parser');




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

//getting all the users from the database
app.get("/users",(req,res,next) => {
   UserModel.find({})
    .then((users) => {
        res.status(200).json({
            response:true,
            users:users
        })
    })
    .catch((err) => {
        res.status(422).json({
            error:err,
            response:false
        })
    })
})

//adding a new user to the data
app.post("/user",(req,res,next) => {
    let user = new UserModel({
        phone:req.body.phone,
        address:req.body.address,
        idProof:req.body.idProof
    })

    user.save()
        .then((usr) => {
            res.status(200).json({
                msg:1,
                data:"user has been inserted",
                user:usr
            })
        })
        .catch((err) => {
            res.status(422).json({
                error:err,
                response:false
            })
        })
})

app.listen(3000,() => {
    console.log('server starts....')
})
