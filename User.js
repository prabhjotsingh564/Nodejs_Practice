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
    },
     password: {
        type: String
    }

},{
    timestamps:true,
    // collection: 'userinfo'  this is used to specify collection name
})

module.exports= mongoose.model('User',userSchema)