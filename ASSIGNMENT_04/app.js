const express=require('express');
const PORT=7899;

const app=express();

app.set("view engine","ejs");

app.listen(PORT,(err)=>{
    if(err) throw err;
    console.log(`Listening on ${PORT}`);
});