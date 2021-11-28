const express = require('express');
const router = express.Router();
const {registerNewUser,loginUser,logoutUser,forgetPassword,resetPassword,getUserDetails} = require('../controllers/userController');

const {isAuthenticatedUser,authorizeRole} = require('../middleware/auth');

router.route("/register").post(registerNewUser);
router.route("/login").post(loginUser);
router.route("/password/forget").post(forgetPassword);
router.route("/logout").get(logoutUser);
router.route('/password/:token').put(resetPassword);
router.route("/me").get(isAuthenticatedUser,getUserDetails);

module.exports = router;