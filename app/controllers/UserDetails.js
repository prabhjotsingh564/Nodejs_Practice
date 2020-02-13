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

