const userSchema = require("../models/User");
const bcrypt=require('bcrypt');// to hash the data
const { activateAccountMail } = require("../services/mailService");
const { json } = require("express");
const SALT_ROUNDS=10;


const registerUser=async(req,res)=>{

    try {

        if(req.session.username){
            return res.redirect('/menu')
        }
        else{
            const {name,email,password,mobile,address}=req.body;
            let userData=await userSchema.findOne({email:email});
            if(!userData){
                let hashedPassword=await bcrypt.hash(password,SALT_ROUNDS);
                user=new userSchema({name,email,password:hashedPassword,mobile,address});
                user.save();
                activateAccountMail(user);
                return res.render("signup", { succs: "Activation Email Sended to your mail" });
            }
            else{
                return res.render("signup", { error: "User Already Registered" });
            }

        }
        
    } catch (error) {
        console.log(error);
    }

}

const login=async(req,res)=>{
    const {email,password}=req.body;
    // console.log({email,password});
    if(req.session.username){
        return res.redirect('/menu')
    }
    try {
        let data=await userSchema.findOne({email:email});
        console.log(data);
        if(data){
            if(bcrypt.compareSync(password,data.password)){
                req.session.username=data.name;
                req.session.email=data.email;
                return res.redirect('/menu')
            }
            else{
                return res.render("login", { error: "Incorrect Password" });
            }
        }
        else{
            return res.render("login", { error: "Incorrect Email Id" });
        }
        
    } catch (error) {
        console.log(error);
    }

}

const signupView=(req,res)=>{

    if(req.session.username){
        return res.redirect('/menu')
    }
    return res.render('signup')
}

const loginView=(req,res)=>{

    if(req.session.username){
        return res.redirect('/menu')
    }
    return res.render('login')
}

const activateAccount=async(req,res)=>{
    const {id}=req.params;
    try {
        await userSchema.findOneAndUpdate({_id:id},{$set:{status:1}});//if user click on activate account link status set to 1 in DB
        res.redirect('/');
    } catch (error) {
        console.log(error);
        res.redirect("/login");
    }
}

const logout=(req,res)=>{
    req.session.destroy((err) => {
        res.redirect('/') // will always fire after session is destroyed
    })
}

const defaultPage=(req,res)=>{
    if(req.session.username){
        return res.redirect('/menu')
    }
    return res.render('index')
}

const profileHandler=async(req,res)=>{
    try {
        if(!req.session.username){
            return res.redirect('/')
        }
        const email=req.session.email;
        console.log(email);
        let data=await userSchema.findOne({email:email});
        if(data){
            console.log(data);
            return res.render('profile',{data:data.toJSON()});
        }

        
    } catch (error) {
       console.log(error); 
    }
}

module.exports={
    defaultPage,
    registerUser,
    activateAccount,
    login,
    signupView,
    loginView,
    logout,
    profileHandler
}
