var mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');
var userSchema = mongoose.Schema({
    phone:{
        type:String,
        default:"12345",
        unique: true
    },
    address:{
        type:String
    },
    idProof:{
        type:String,
        default:"Driving License"
    },
     password: {
        type: String
    }

},{
    timestamps:true,
    // collection: 'userinfo'  this is used to specify collection name
})

userSchema.plugin(uniqueValidator, {message: '{PATH}({VALUE}) already exist!!'});

module.exports= mongoose.model('User',userSchema)