const express = require('express');
const router = express.Router();
const {registerNewUser,loginUser,logoutUser,forgetPassword,resetPassword,getUserDetails,updatePassword,updateProfile,deleteUser,updateUserRole,getAllUsers,getUser} = require('../controllers/userController');

const {isAuthenticatedUser,authorizeRole} = require('../middleware/auth');

router.route("/register").post(registerNewUser);
router.route("/login").post(loginUser);
router.route("/password/forget").post(forgetPassword);
router.route("/logout").get(logoutUser);
router.route('/password/:token').put(resetPassword);
router.route("/me").get(isAuthenticatedUser,getUserDetails);
router.route('/password/update').put(isAuthenticatedUser,updatePassword);
router.route('/me/update').put(isAuthenticatedUser,updateProfile);
router.route('/admin/users').get(isAuthenticatedUser,authorizeRole("admin"),getAllUsers);
router.route('/admin/user/:id').get(isAuthenticatedUser,authorizeRole("admin"),getUser);
router.route('/admin/user/:id').delete(isAuthenticatedUser,authorizeRole("admin"),deleteUser);
router.route('/admin/user/:id').put(isAuthenticatedUser,authorizeRole("admin"),updateUserRole);

module.exports = router;