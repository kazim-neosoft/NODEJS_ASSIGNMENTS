const express=require('express');
const mongoose=require('mongoose');
const productRouter=require('./routes/productRouter');
const CONNECTION_URL="mongodb://localhost:27017/assignment4";
const PORT=6999;

const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use("/",productRouter);

mongoose.connect(CONNECTION_URL,(err)=>{
    if (err) throw err;
    console.log("Connected to MongoDB");
});



app.set("view engine","ejs");

app.listen(PORT,(err)=>{
    if(err) throw err;
    console.log(`Listening on ${PORT}`);
});