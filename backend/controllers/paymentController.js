const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const axios = require('axios');


exports.processPayment = catchAsyncErrors(async (req, res, next) => {

    const data = {
        "token": req.body.token,
        "amount": req.body.amount
    };
    console.log(data);
    let config = {
        headers: {
            'Authorization': process.env.KHALTI_SECRET_KEY
        }
    };
    const response = await axios.post(`https://khalti.com/api/v2/payment/verify/`, data, config);
    res.status(200).json({ success: true, response});

});

exports.sendKhaltiKey = catchAsyncErrors(async (req, res, next) => {
    res.status(200).json({success: true, khaltiPublicKey: process.env.KHALTI_PUBLIC_KEY});
})
