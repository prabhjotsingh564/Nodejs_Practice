var mongoose = require('mongoose')
var userSchema = mongoose.Schema({
    phone:{
        type:String,
        default:"12345"
    },
    address:{
        type:String
    },
    idProof:{
        type:String,
        default:"Driving License"
    }
},{
    timestamps:true
})

module.exports= mongoose.model('User',userSchema)