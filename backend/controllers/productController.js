const Product = require('../models/productModel'); 
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const ApiFeatures = require('../utils/apiFeatures');



// create product -- Admin
exports.createProduct = catchAsyncErrors(async (req,res) =>{
        const product = await Product.create(req.body);
    
        res.status(200).json({
            success:true,
            product
        });
    }
);

// get All Products
exports.getAllProducts = catchAsyncErrors(async (req,res) =>{
    const apiFeature = new ApiFeatures(Product.find(),req.query).search().filter();
    console.log(apiFeature);
    const products = await apiFeature.query;
    
    res.status(200).json({
        success:true,
        products
    });
})

// Update Product -- Admin

exports.updateProduct = catchAsyncErrors(async (req,res,next)=>{
    let product = await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler('Product Not Found',404));
    }
    product = await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    });
    res.status(200).json({
        success:true,
        product
    })
})


// Delete Product --Admin

exports.deleteProduct = catchAsyncErrors(async (req,res,next) =>{
        const product =  await Product.findByIdAndRemove(req.params.id);
    
        if(!product){
            return next(new ErrorHandler('Product Not Found',404));
        }
        res.status(200).json({
            success:true,
            message:"Product Deleted Successfully",
            product
        });
    }
)

// Get Product Details

exports.getProductDetails = catchAsyncErrors(async (req,res,next) =>{
    const product = await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler('Product Not Found',404));
    }
    res.status(200).json({
        success:true,
        product
    });
});