const User = require("../models/User");
const { orderSuccess } = require("../services/mailService");

const checkOut=(req,res)=>{
    // const amount=req.query.amount;
    const amount=req.session.totalPrice;
    return res.render('checkout',{amount:amount})
}

const orderHandler=async(req,res)=>{
    try {
        let email=req.session.email;
        console.log(email);
        let data = await User.findOne({email:email});
        console.log(data);
        if(data.status==1){
            let amount=req.session.totalPrice;
            orderSuccess(amount,data);
            delete req.session.cart;
            return res.render('order',{succs:'You will recieve notification by email with order details'})
        }
        else{
            return res.render('order',{error:'Please Verify Your Email First'})
        }

    } catch (error) {
        console.log(error);
    }
}

module.exports={
    checkOut,
    orderHandler
}