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


//getting all the users from the database
app.get("/users", VerifyAuthentication, (req, res, next) => {
    UserModel.find({ _id: req.body.decodedInfo.id })
        .then((response) => {
            UserModel.find({})
                .then((users) => {
                    res.status(200).json({
                        response: true,
                        users: users
                    });
                })
                .catch((err) => {
                    res.status(422).json({
                        error: err,
                        response: false
                    });
                });
        })
        .catch(err => {
            res.status(422).json({
                response: true,
                error: err
            });
        })
});


//adding a new user to the data
app.post("/user",(req,res,next) => {
    bcrypt.hash(req.body.password, 10, function (error, pswd) {
        let user = new UserModel({
            phone: req.body.phone,
            address: req.body.address,
            idProof: req.body.idProof,
            password: pswd
        });
        user.save()
            .then((usr) => {
                res.status(200).json({
                    msg: 1,
                    data: 'User has been inserted successfully',
                    user: usr
                });
            })
            .catch((err) => {
                res.status(422).json({
                    error: err,
                    response: false
                });
            });
    })
})

app.post("/login",(req,res,next) => {
    UserModel.findOne({ phone: req.body.phone.toString() })
    .then((user) => {
        if (user) {
            bcrypt.compare(req.body.password, user.password, function (err, response) {
                // res == true
                if (response == true) {
                    JWT.sign({
                        id: user._id,
                        phone: user.phone
                    }, 'Welcome to Nugen',{
                        expiresIn: '1d'
                    }, function (err, token) {
                        res.status(200).json({
                            response: true,
                            token,
                            msg: "logged in successfully"
                        });
                    })

                } else {
                    res.status(422).json({
                        response: false,
                        msg: "Wrong Phone/Password"
                    });
                }
            });

        } else {
            res.status(422).json({
                response: false,
                msg: "Wrong Phone/Password"
            });
        }
    });
})


app.listen(3000,() => {
    console.log('server starts....')
})
