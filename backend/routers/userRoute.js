const express = require('express');
const router = express.Router();
const {registerNewUser,loginUser,logoutUser} = require('../controllers/userController');

router.route("/register").post(registerNewUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser)

module.exports = router;