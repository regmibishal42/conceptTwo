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
        totalPrice
    } = req.body;

    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
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
    const orders = await Order.find({user:req.user._id});
    res.status(200).json({
        success:true,
        orders
    })
});

// Get All Orders Admin side
exports.getAllOrders = catchAsyncErrors(async(req,res,next)=>{
    const orders = await Order.find();
        // if(!orders) return next(new ErrorHandler('Orders Not Found',404));
    let totalAmount = 0;
    orders.forEach(order => {
        totalAmount += order.totalPrice;
    });

    res.status(200).json({
        success:true,
        totalAmount,
        orders
    });
});

// Update Order Status --Admin Side Route

exports.updateOrder = catchAsyncErrors(async(req,res,next)=>{
    const order = await Order.findById(req.params.id);

    if(order.orderStatus === "Delivered"){
        return next(new ErrorHandler("You have already Delivered This Order",400));
    }
    order.orderItems.forEach(async (order)=>{
        await updateStock(order.Product,order.quantity);
    });

    order.orderStatus = req.body.status;
    if(req.body.status ==="Delivered") order.deliveredAt = Date.now();

    await order.save({validateBeforeSave:false})
    res.status(200).json({
        success:true
    });
});

// Function To Update The Stock
async function updateStock(id,quantity){
    const product = await Product.findById(id);
    product.stock -= quantity;
    await product.save({validateBeforeSave:false});
};

// Delete Order --- Admin Side
exports.deleteOrder = catchAsyncErrors(async(req,res,next)=>{
    const order = await Order.findById(req.params.id);
    if(!order) return next(new ErrorHandler('Order Not Found',404));
    await order.remove();

    res.status(200).json({
        success:true,
    });
});