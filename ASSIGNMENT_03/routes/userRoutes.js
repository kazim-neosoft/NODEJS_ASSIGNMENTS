const express=require('express');
const fs=require('fs')
const router=express.Router();
const {registration,login}=require('../controllers/users');

// rendering user/login page
router.get("/login",(req,res)=>{
    res.render("login")
})

// rendering user/registration page
router.get("/registration",(req,res)=>{
    res.render("registration")
})

//  rendering welcome page with one mandatory param and one non mandate param (optional chaining)
router.get("/welcome/:emailid/:username?",(req,res)=>{
    
    // getting value of params
    const {emailid,username}=req.params;

    // hanlder for registration info
    if(emailid && username==undefined){
    if(fs.existsSync(`./userData/${emailid}.txt`)){
        // fs.exist for more security because user can acces this pages with params i.e. this extra check apply
        res.render("welcome",{registrationToken:emailid})
       }
    //rendering Invalid access
       res.render("welcome",{invalidToken:"Invalid Access"})

    }else{
        // handler for login info
        if(fs.existsSync(`./userData/${emailid}.txt`)){
            // fs.exist for more security because user can acces this pages with params i.e. this extra check apply
        res.render("welcome",{email:emailid,username:username})
        }
        //rendering Invalid access
        res.render("welcome",{invalidToken:"Invalid Access"})
    }
});
// router for POST method for registration
router.post("/postData",registration);

// router for POST method for login
router.post("/login",login);

module.exports=router;