var UserModel = require('../models/User');
const FUNCTION = require('../../function');
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');


module.exports.save = async (req,res,next) => {
    try{
        let encrypedPass = await bcrypt.hash(req.body.password,10);
        req.body.password=encrypedPass;
        let user = new UserModel({...req.body});
        let usr = await user.save();
        if(usr){
            FUNCTION.success({
                status:200,
                msg:"users added successfully",
                data:usr
            },res);
        }
    }
    catch(err){
        FUNCTION.error({
            status:422,
            msg:" ",
            error:err
        },res);
    }
};

module.exports.getAllUsers = async (req,res,next) => {
    try{
        let user = await UserModel.find({_id: req.body.decodedInfo.id})
        if(user){
            let usr= await UserModel.find({})
            if(usr){
                FUNCTION.success({
                    status:200,
                    msg:"users fetched successfully",
                    data:usr
                },res);
            }else{
                FUNCTION.error({
                    status:422,
                    msg:" ",
                    error:"users not found"
                },res);
            }
        }
    }
    catch(err){
       FUNCTION.error({
           status:422,
           msg:" ",
           error:err
       },res);
    }
};

module.exports.login = async (req,res,next) => {
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
                            FUNCTION.success({
                                status:200,
                                msg:"logged in successfully",
                                data:{token:token}
                            },res);
                        }
            }else{
                FUNCTION.error({
                    status:422,
                    msg:"password is not correct ",
                    error:" "
                },res);
            }
        }else{
            FUNCTION.error({
                status:422,
                msg:"phone number is not correct",
                error:" "
            },res);
        }
    }
    catch(err){
        FUNCTION.error({
            status:422,
            msg:"Wrong Phone/Password",
            error:err
        },res);
    }
};