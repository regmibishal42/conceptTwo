const ErrorHandler = require("../utils/errorHandler");
const jwt = require('jsonwebtoken');
const User = require("../models/userModel");

exports.isAuthenticatedUser = async(req,res,next) => {
    const {token} = req.cookies;
    if(!token){
        return next(new ErrorHandler(401,'Please Login To Access The Following Resources'));
    } 
    const decodedData = jwt.verify(token,process.env.JWT_SECRET);
    req.user = await User.findById(decodedData._id);
    next();
}

