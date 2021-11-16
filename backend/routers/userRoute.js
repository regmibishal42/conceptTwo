const express = require('express');
const router = express.Router();
const {registerNewUser,loginUser} = require('../controllers/userController');

router.route("/register").post(registerNewUser);
router.route("/login").post(loginUser);

module.exports = router;