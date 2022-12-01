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
},{timestamps:true});//timestamps with  createdAt and updatedAt  field in schema

module.exports=mongoose.model("products",productSchema);//making a schema model