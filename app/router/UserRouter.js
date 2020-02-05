const express = require('express');

const VerifyAuthentication = require('../middlewares/Auth');
const UserController = require('../controllers/Users');

const router =express.Router();

router.get("/",VerifyAuthentication,UserController.getAllUsers);
router.post("/",UserController.save);
router.post("/login",UserController.login);

module.exports=router;