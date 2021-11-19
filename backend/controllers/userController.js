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
    console.log(req.body);
    if(!email || !password){
        return next(new ErrorHandler(400,'Please Enter Email And Password'));
    }
    const user = await User.findOne({email}).select("+password");
    if(!user){
        return next(new ErrorHandler(401,'Invalid Email or Password'));
    }
    const isPasswordMatched = await user.comparePassword(password);
    if(!isPasswordMatched){
        return next(new ErrorHandler(401,'Invalid Email or Password'));
    }
    sendToken(user,200,res);
});

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxOTc3M2E5NTJhY2UzYTI3ZmEyZmZhYyIsImlhdCI6MTYzNzMxNTQ5NywiZXhwIjoxNjM3NzQ3NDk3fQ.JbGliuzAlQnsI7Vso3VQo8Ix6m8s39dsZIALn5MLWrc
// User 2