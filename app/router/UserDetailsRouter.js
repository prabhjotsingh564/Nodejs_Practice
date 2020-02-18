const express = require('express');
const UserDetailController = require('../controllers/UserDetails');
const router = express.Router();
const upload = require('../middlewares/ImageUploadConfig');
const FUNCTION = require('../../function');

const {check,validationResult} = require('express-validator');

var userValidation =  [
     check('nickName').isLength({min:5}),
]

const checkForValidationErrors = (req,res,next) => {
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

router.post("/" ,userValidation,checkForValidationErrors,upload.single('file'),UserDetailController.save);
router.get("/" ,UserDetailController.getAllUsers);


module.exports = router;