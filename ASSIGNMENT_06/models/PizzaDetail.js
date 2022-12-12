const mongoose = require('mongoose');
const pizzaSchema=mongoose.Schema({
    image:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
})

module.exports=mongoose.model("pizza",pizzaSchema);
