const express=require('express');
const router=express.Router();

// main routes to render index page
router.get("/",(req,res)=>{
    res.render("index");
})

module.exports=router;