
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const axios = require('axios');


exports.processPayment = catchAsyncErrors(async(req,res,next)=>{
    const data = {
        "token":"",
        "amount":1000
    };
    let config = {
        headers:{'Authorization':process.env.KHALTI_SECRET_KEY}
    }
    const response = await axios.post(`ttps://khalti.com/api/v2/payment/verify/`,data,config);
    if(response.data) return res.status(200).json({success:true,response:response.data});
});

exports.sendKhaltiKey = catchAsyncErrors(async(req,res,next)=>{
    res.status(200).json({
        success:true,
        khaltiPublicKey:process.env.KHALTI_PUBLIC_KEY
    });
})