const express = require('express');

const VerifyAuthentication = require('../middlewares/Auth');
const UserController = require('../controllers/Users');
const FUNCTION = require('../../function');
const {check} = require('express-validator');
const router =express.Router();
var userValidation =  [
    check('phone').isLength({min:5}),
]


const checkForValidationErrors = (req,res,next) => {
   const {validationResult}  = require('express-validator');

   const errors = validationResult(req);
   if(!errors.isEmpty()){
        FUNCTION.error({
           status:422,
           msg:'Validation Error',
           error: errors.array()
       },res);
   }else{
       next();
   }
}
router.get("/",VerifyAuthentication,UserController.getAllUsers);
router.post("/",userValidation,checkForValidationErrors,UserController.save);
router.post("/login",UserController.login);

module.exports=router;