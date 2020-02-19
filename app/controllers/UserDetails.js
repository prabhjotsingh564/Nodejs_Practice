var UserDetailModel = require('../models/UserDetail');//
const FUNCTION = require('../../function');

module.exports.getAllUsers = async (req,res,next) => {
    try{
        let users = await UserDetailModel.find({}).populate('user');
        FUNCTION.success({
            status: 200,
            msg: 'Users fetched successfully',
            data: users
        }, res);
    }
    catch(err){
        res.status(422).json({
            response: false,
            error: err
        });
    }
}
module.exports.getUserById = async (req,res,next) => {
    try{
        let userId = req.params.userId;
        let user = await UserDetailModel.find({_id:userId}).populate('user')
        FUNCTION.success({
            status:200,
            msg:"user by id fetch successfully",
            data:user
        },res);
    }   
    catch(err){
        FUNCTION.error({
            status:422,
            msg:" error while fetching user by Id",
            error:err
        },res);
    }
}
module.exports.save = async (req, res, next) => {
    try {
        req.body.profilePic = req.file.filename;
        let user = await new UserDetailModel({...req.body}).save();
        FUNCTION.success({
            status: 200,
            msg: 'Users saved successfully',
            data: user
        }, res);
    }
    catch (err) {
        res.status(422).json({
            response: false,
            error: err
        });
    }
}

