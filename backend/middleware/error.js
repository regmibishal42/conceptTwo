const ErrorHandler = require('../utils/errorHandler');


module.exports = (err,req,res,next)=>{
    err.statusCode = err.statusCode ||500;
    err.message = err.message || 'Internal Server Error';

    // Wrong Mongodb Id Error
    if(err.name === "CastError"){
        const message = `Resource not found.Invalid Id ${err.path}`;
        err = new ErrorHandler(message,400);
    }
    // Mongoose Duplicate Key Error
    if(err.code === 11000){
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
        err = new ErrorHandler(message,400);
    };

    // Wrong JSON WEB TOKEN ERROR
    if(err.name === 'jsonWebTokenError'){
        const message = 'Json Web Token Is Invalid. Try Agian';
        err = new ErrorHandler(message,400);
    };

    // Json Web Token Expire Error
    if(err.name === 'TokenExpiredError'){
        const message = 'Json Web Token Has Expired. Please Login Agian.';
        err = new ErrorHandler(message,400);
    };
     
    res.status(err.statusCode).json({
        success:false,
        message:err.message
    });
} 