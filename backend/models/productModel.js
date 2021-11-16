const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please Enter Product Name'],
        trim:true
    },
    description:{
        type:String,
        required:[true,'Please Enter Product Description']
    },
    price:{
        type:Number,
        required:[true,'Please Enter The Price'],
        maxlength:[8,"Price Cannot Exceed 8 Figures"]
    },
    rating:{
        type:Number,
        default:0,

    },
    images:[{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }

    }],
    category:{
        type:String,
        required:[true,'Please Enter Product Category'],

    },
    stock:{
        type:Number,
        required:[true,'Please Enter product Stock'],
        default:1,
        maxlength:[4,"Stock cannot exceed 4 Figures"]
    },
    numOfReviews:{
        type:Number,
        default:0,
    },
    reviews:[
        {
            name:{
                type:String,
                required:true
            },
            rating:{
                type:Number,
                required:true
            },
            comment:{
                type:String,
                required:true
            }
        },

    ],
    createdAt:{
        type:Date,
        default:Date.now
    },
});

module.exports = new mongoose.model("Product",productSchema);

