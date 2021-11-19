const ErrorHandler = require('../utils/errorHandler');
const jwt = require('jsonwebtoken');
const User = require("../models/userModel");
const catchAsyncErrors = require('../middleware/catchAsyncErrors');

exports.isAuthenticatedUser = catchAsyncErrors(async (req,res,next) => {
    const {token} = req.cookies;
    if(!token){
        return next(new ErrorHandler('Please Login To Access The Following Resources',401));
    } 
    const decodedData = jwt.verify(token,process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decodedData.id);
    next();
});

