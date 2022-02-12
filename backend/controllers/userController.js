const ErrorHandler = require('../utils/errorHandler');
const User = require('../models/userModel');
const sendToken = require('../utils/jwtToken');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');
const cloudinary = require('cloudinary');

// Register New User
exports.registerNewUser = catchAsyncErrors(async (req, res, next) => {
    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: 'avatars',
        width: 150,
        crop: 'scale'
    });

    const {name, email, password} = req.body;

    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: myCloud.public_id,
            url: myCloud.secure_url
        }
    });
    sendToken(user, 201, res);
});

// Login
exports.loginUser = catchAsyncErrors(async (req, res, next) => {

    const {email, password} = req.body;
    // Checking if user has given both user and password
    if (!email || !password) {
        return next(new ErrorHandler('Please Enter Email And Password', 400));
    }
    const user = await User.findOne({email}).select("+password");
    if (! user) {
        return next(new ErrorHandler('Invalid Email or Password', 401));
    }
    const isPasswordMatched = await user.comparePassword(password);
    if (! isPasswordMatched) {
        return next(new ErrorHandler('Invalid Email or Password', 401));
    }
    sendToken(user, 200, res);
});

// LogOut User

exports.logoutUser = catchAsyncErrors(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    });

    res.status(200).json({success: true, message: "Logged Out"});
});

// Forget Password
exports.forgetPassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findOne({email: req.body.email});
    if (! user) {
        return next(new ErrorHandler("User Not Found", 404));
    }
    // Get Reset password Token
    const resetToken = user.getResetPasswordToken();
    await user.save({validateBeforeSave: false});

    const resetPasswordUrl = `${
        req.protocol
    }://${
        req.get("host")
    }/api/v1/password/${resetToken}`;
    const message = `Your Password Reset Token is: -\n\n ${resetPasswordUrl}  \n\n If you didnot request for this email then ignore it.`;

    try {
        console.log('Hello');
        await sendEmail({email: user.email, subject: 'ConceptTwo Password Recovery', message});
        res.status(200).json({success: true, message: `Email Send To ${
                user.email
            } successfully`});

    } catch (ex) {
        user.resetPasswordToken = undefined;
        user.resetPasswordUrl = undefined;
        await user.save({validateBeforeSave: false});
        return next(new ErrorHandler(ex.message, 500));
    }
});

// Reset Password Link

exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: {
            $gt: Date.now()
        }
    });
    if (! user) {
        return next(new ErrorHandler("Invalid or Expired Reset Password Link", 404));
    };
    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler("Password doesnot Match", 400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordUrl = undefined;

    await user.save();
    sendToken(user, 200, res);


});

// Get User Details
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => { 
    // if User is logged in all his info is in req.user
    const user = await User.findById(req.user.id);

    res.status(200).json({success: true, user});


});

// Update User Password
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id).select("+password");

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
  
    if (!isPasswordMatched) {
      return next(new ErrorHandler("Old password is incorrect", 400));
    }
  
    if (req.body.newPassword !== req.body.confirmPassword) {
      return next(new ErrorHandler("password does not match", 400));
    }
  
    user.password = req.body.newPassword;
  
    await user.save();
  
    sendToken(user, 200, res);
  });

// Update User Profile

exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email
    }
    // Adding Couldify Profile Link
    if (req.body.avatar !== "") {
        const user = await User.findById(req.user.id);
        const imageId = user.avatar.public_id;

        await cloudinary.v2.uploader.destroy(imageId);

        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: 'avatars',
            width: 150,
            crop: 'scale'
        });
        newUserData.avatar = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url
        }
    }


    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });
    res.status(200).json({success: true})
});


// Get All Users

exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {
    const users = await User.find();

    res.status(200).json({success: true, users});
});

// Get Single User For Admin Panel in Frontend

exports.getUser = catchAsyncErrors(async (req, res, next) => {
    const userDetails = await User.findById(req.params.id);
    if (!user) {
        return next(new ErrorHandler('User Not Found', 404));
    };
    res.status(200).json({success: true, userDetails});
});

// Update User Role --Admin
exports.updateUserRole = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    }
    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });
    res.status(200).json({success: true})
});

// Delete User Profile --Admin
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (! user) {
        return next(new ErrorHandler(`User Doesnot Exist With id ${
            req.params.id
        }`, 400));
    }
    await user.remove();

    res.status(200).json({success: true, message: 'User Deleated Successfully'});
});
