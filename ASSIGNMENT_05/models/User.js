const mongoose=require('mongoose');
const userSchema=mongoose.Schema({
    email:{
        type:String,
        unique:true,
        required:true,
    },
    username:{
        type:String,
        unique:true,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    status:{
        type:Number,
        required:true,
        default:0
    }
},{timestamps:true});

module.exports=mongoose.model("user",userSchema);