const ErrorHandler = require('../utils/errorHandler');
const User = require('../models/userModel');
const sendToken = require('../utils/jwtToken');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');

// Register New User
exports.registerNewUser = catchAsyncErrors(async (req,res,next) =>{
    const {name,email,password} = req.body;

    const user = await User.create({
        name,
        email,
        password,
        avatar:{
            public_id:'This is a public id ',
            url:'This is a url to image'
        }
    });
    sendToken(user,201,res);
});


exports.loginUser = catchAsyncErrors(async(req,res,next) =>{

    const {email,password} = req.body;
    // Checking if user has given both user and password
    if(!email || !password){
        return next(new ErrorHandler('Please Enter Email And Password',400));
    }
    const user = await User.findOne({email}).select("+password");
    if(!user){
        return next(new ErrorHandler('Invalid Email or Password',401));
    }
    const isPasswordMatched = await user.comparePassword(password);
    if(!isPasswordMatched){
        return next(new ErrorHandler('Invalid Email or Password',401));
    }
    sendToken(user,200,res);
});

// LogOut User

exports.logoutUser = catchAsyncErrors(async(req,res,next)=>{
    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true
    });

    res.status(200).json({
        success:true,
        message:"Logged Out",
    });
});

// Forget Password
exports.forgetPassword = catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findOne({email:req.body.email});
    if(!user){
        return next(new ErrorHandler("User Not Found",404));
    }
    // Get Reset password Token
    const resetToken = user.getResetPasswordToken();
    await user.save({validateBeforeSave:false});

    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/${resetToken}`;
    const message = `Your Password Reset Token is: -\n\n ${resetPasswordUrl}  \n\n If you didnot request for this email then ignore it.`;

    try{
        await sendEmail({
            email:user.email,
            subject:'ConceptTwo Password Recovery',
            message
        });
        res.status(200).json({
            success:true,
            message:`Email Send To ${user.email} successfully`,
        });
        
    }catch(ex){
        user.resetPasswordToken = undefined;
        user.resetPasswordUrl = undefined;
        await user.save({validateBeforeSave:false});
        return next(new ErrorHandler(ex.message,500));
    }
});

// Reset Password Link 

exports.resetPassword = catchAsyncErrors(async(req,res,next)=>{
        const resetPasswordToken = crypto
                                    .createHash('sha256')
                                    .update(req.params.token)
                                    .digest("hex");
        
        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire:{$gt:Date.now()}
        });
        if(!user){
            return next(new ErrorHandler("Invalid or Expired Reset Password Link",404));
        };
        if(req.body.password !== req.body.confirmPassword){
            return next(new ErrorHandler("Password doesnot Match",400));
        }

        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordUrl = undefined;

        await user.save();
        sendToken(user,200,res);


});




