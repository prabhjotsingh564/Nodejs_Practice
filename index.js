const  http = require('http')
const express =require('express')
var mongoose = require('mongoose');
const app =express();
var UserModel = require('./app/models/User');
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


app.use('/user',require('./app/router/UserRouter'));
app.use('/userdetail',require('./app/router/UserDetailsRouter'));
app.use('/uploads' , express.static('uploads'));
app.listen(3000,() => {
    console.log('server starts....')
})
