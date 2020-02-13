const express = require('express');
const uniqid = require('uniqid');
const path = require('path');
const multer = require('multer');
const VerifyAuthentication = require('../middlewares/Auth');
const UserDetailController = require('../controllers/UserDetails');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './app/uploads')
    },
    filename: function (req, file, cb) {
        // console.log(path.extname(file.originalname));
        cb(null, uniqid() + path.extname(file.originalname).toLowerCase());
    }
})


var upload = multer({
    storage,
    fileFilter: function (req, file, cb) {
        var ext = path.extname(file.originalname).toLowerCase();
        if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            return cb(new Error('Please upload a valid image file'));
        }
        cb(null, true)
    },
});

const router = express.Router();

router.post("/" ,upload.single('file'),UserDetailController.save);
router.get("/" ,UserDetailController.getAllUsers);


module.exports = router;