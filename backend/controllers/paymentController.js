const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const axios = require('axios');


exports.processPayment =  (req, res) => {
    const data = {
        "token": req.body.token,
        "amount": req.body.amount
    };
    console.log(data);
    let config = {
        headers: {
            'Authorization':`Key ${process.env.KHALTI_SECRET_KEY}`,
            "Content-Type": 'application/json',
            "Access-Control-Allow-Origin": "*"
        }
    };

axios.post("https://khalti.com/api/v2/payment/verify/", data, config)
.then(response => {
    console.log(response.data);
    res.status(200).json({ success: true, data:response.data});
})
.catch(error => {
    console.log(error);
    res.status(500).json({success:false,error:error.response.data});
});
    // const {response,error} = await axios.post(`https://khalti.com/api/v2/payment/verify/`, data, config);
    // if(response.data) return res.status(200).json({ success: true, data:response.data});
    // return res.status(500).json({success:false,error:error.response.data});

};

exports.sendKhaltiKey = catchAsyncErrors(async (req, res, next) => {
    res.status(200).json({success: true, khaltiPublicKey: process.env.KHALTI_PUBLIC_KEY});
})
