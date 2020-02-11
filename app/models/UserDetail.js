var mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

var UserDetailSchema = mongoose.Schema({
    user:{
        type:mongoose.Types.ObjectId,
        ref:'User'
    },
    nickName:{
        type:String,
    }
},{
    timestamps: true
});

module.exports = mongoose.model('UserDetail', UserDetailSchema);