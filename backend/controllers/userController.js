const ErrorHandler = require('../utils/errorHandler');
const User = require('../models/userModel');
const sendToken = require('../utils/jwtToken');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const sendEmail = require('../utils/sendEmail');

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




// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxOTc3M2E5NTJhY2UzYTI3ZmEyZmZhYyIsImlhdCI6MTYzNzMxNTQ5NywiZXhwIjoxNjM3NzQ3NDk3fQ.JbGliuzAlQnsI7Vso3VQo8Ix6m8s39dsZIALn5MLWrc
// User 2
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxOTc3MzgyOWFlMmRiMzRiOGUxMGVkOCIsImlhdCI6MTYzNzMxNjM5OCwiZXhwIjoxNjM3NzQ4Mzk4fQ.lVypn7C2259rMvouRNtCT03_b60feFlgJAglxKEohnQ
// user1