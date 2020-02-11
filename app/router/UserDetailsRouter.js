const express = require('express');

const VerifyAuthentication = require('../middlewares/Auth');
const UserDetailController = require('../controllers/UserDetails');

const router = express.Router();

router.post("/" ,UserDetailController.save);
router.get("/" ,UserDetailController.getAllUsers);


module.exports = router;