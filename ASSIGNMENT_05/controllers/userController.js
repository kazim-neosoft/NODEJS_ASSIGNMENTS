const bcrypt=require('bcrypt');
const crypto=require('crypto');
const nodemailer=require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const session = require('../middlewares/sessionMiddleware');
const userModelSchema = require('../models/User');
const upload = require('./fileUploadController');
const uploadSingle=upload.single('profileupload');
require('dotenv').config();


const defaultPage=(req,res)=>{
    if(req.session.username){
        return res.redirect("/dashboard");
    }else{
        return res.redirect("/login")
    }
}

const registrationRender=(req,res)=>{
    return res.render("registration")
}

const registerUser=async(req,res)=>{
    uploadSingle(req,res,async(err)=>{
        if(err)
        {
            return res.render('registration',{error:err.message})
        }
        else{
            let {email,username,password}=req.body;
            let hashPassword=await bcrypt.hash(password,10);
            let user = await userModelSchema.findOne({username});

            if(!user){
                userData=new userModelSchema({email,username,password:hashPassword,image:req.file.filename});
                userData.save();

                let transporter=nodemailer.createTransport({
                    service:"gmail",
                    port:587,
                    secure:false,
                    auth:{
                        user:process.env.EMAIL,
                        pass:process.env.EMAIL_PASSWORD
                    }
                });
                
                transporter.use('compile', hbs(
                    {
                        viewEngine:"nodemailer-express-handlebars",
                        viewPath:"emailViews/emailTemplates/",
                        
                    }
                ));

                let mailOptions={
                    from:process.env.EMAIL,
                    to:email,
                    subject:"Activate your account",
                    template:'activation',
                    context:{
                        username:username,
                        id:userData._id }
                }

                transporter.sendMail(mailOptions,(err,info)=>{
                    if(err){ console.log(err)}
                    else{
                        res.redirect("/login")
                    }
                })

            }
            else{
                res.render("registration", { error: "User Already Registered" });
            }
        }
    })
}

const activateAccount=async(req,res)=>{
    const {id}=req.params;
    try {
        await userModelSchema.findOneAndUpdate({_id:id},{$set:{status:1}});
        let data = await userModelSchema.findOne({_id:id});
        req.session.username=data.username;
        console.log(req.session.username);
        // res.render("dashboard",{username:data.username});
        res.redirect('/dashboard')
    } catch (error) {
        console.log(error);
        res.redirect("/login")
    }
}

const loginUser=async(req,res)=>{
    const {username,password}=req.body;
    try {

        let data = await userModelSchema.findOne({username});
        if(data){
            if(bcrypt.compareSync(password,data.password)){
                req.session.username=data.username;
                return res.redirect('/dashboard');
            }
            else{
                return res.redirect("/login?msg=fail");
            }
        }
        else{
            return res.redirect("/login?msg=fail");
        }
        
    } catch (error) {
        console.log(error);
        return res.redirect("/login?msg=fail");
    }
}

const loginRender=(req,res)=>{
    let auth = req.query.msg ? true : false;
    if (auth) {
        return res.render("login", { error: 'Invalid username or password' });
    }
    else {
        return res.render("login");
    }
}

const dashboard=async(req,res)=>{
    try {
    let username=req.session.username;
    if(username){
        let data=await userModelSchema.findOne({username});
        return res.render("dashboard",{username:username,imgPath:data.image,email:data.email});
    }
    else{
        console.log(req.session.username);
        return res.redirect("/login");
    }
        
    } catch (error) {
        console.log(error);
    }    
}

const logout=(req,res)=>{
    req.session.destroy();
    return res.redirect("/");
}

const downloadSingleFile=async(req,res)=>{
    const folderpath=__dirname+"/uploads"
    let username=req.session.username;
    if(username){
        let data=await userModelSchema.findOne({username});
        if(data){
            res.download(folderpath+`/${data.image}`,(err)=>{
                if(err){console.log(error);}
            })
        }
    }
    else{
        return res.redirect("/");
    }
}

const changePasswordRender=(req,res)=>{
    return res.render('changepassword');
}

const changePassword=async(req,res)=>{
    let {password,newpassword}=req.body;
    let username=req.session.username;
    if(username){
        let data=await userModelSchema.findOne({username});
        if(bcrypt.compareSync(password,data.password)){
            let hashPwd = await bcrypt.hash(newpassword,10);
            await userModelSchema.findOneAndUpdate({username:username},{$set:{password:hashPwd}});
            return res.render("changepassword", { succs: 'New Password Changed' });

        }
        else{
            return res.render("changepassword", { error: 'Password Not Matched' });
        }
    }
    else{
        return res.render("changepassword", { error: 'Password Not Matched' });
    }
}

const forgotPasswordRender=(req,res)=>{
    return res.render("forgotpassword");
}

module.exports={
    defaultPage,
    registrationRender,
    registerUser,
    activateAccount,
    loginRender,
    loginUser,
    dashboard,
    logout,
    downloadSingleFile,
    changePasswordRender,
    changePassword,
    forgotPasswordRender
}