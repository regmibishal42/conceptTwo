const ErrorHandler = require('../utils/errorHandler');
const User = require('../models/userModel');
const sendToken = require('../utils/jwtToken');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');


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

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxOTc3M2E5NTJhY2UzYTI3ZmEyZmZhYyIsImlhdCI6MTYzNzMxNTQ5NywiZXhwIjoxNjM3NzQ3NDk3fQ.JbGliuzAlQnsI7Vso3VQo8Ix6m8s39dsZIALn5MLWrc
// User 2
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxOTc3MzgyOWFlMmRiMzRiOGUxMGVkOCIsImlhdCI6MTYzNzMxNjM5OCwiZXhwIjoxNjM3NzQ4Mzk4fQ.lVypn7C2259rMvouRNtCT03_b60feFlgJAglxKEohnQ
// user1