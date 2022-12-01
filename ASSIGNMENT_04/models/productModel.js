const mongoose=require('mongoose');

const productSchema=mongoose.Schema({
    productname:{
        type:String,
        required:true,
        unique:true,
    },
    price:{
        type:Number,
        required:true,
    },
    quantity:{
        type:Number,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    imgurl:{
        type:String,
        required:true,
    }
},{timestamps:true});

module.exports=mongoose.model("products",productSchema);