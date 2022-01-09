const Order = require('../models/orderModels');
const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');

// Create New Order
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        taotalPrice
    } = req.body;

    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        taotalPrice,
        PaidAt:Date.now(),
        user:req.user._id,
    });
    res.status(201).json({
        success:true,
        order,
    });
});

// Get Individual Orders

exports.getSingleOrder = catchAsyncErrors(async(req,res,next)=>{
    const order = await Order.findById(req.params.id).populate("user","name email");

    if(!order) return next(new ErrorHandler("Order Not Found",404)); 

    res.status(200).json({
        success:true,
        order
    })
});

// Get Order Deatils For Logged In User
exports.myOrders = catchAsyncErrors(async(req,res,next)=>{
    const order = await Order.find({user:req.user._id});
    res.status(200).json({
        success:true,
        order
    })
});