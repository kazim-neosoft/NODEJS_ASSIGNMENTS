const express = require('express');
const fs=require('fs');

// registration function
const registration=((req,res)=>{
    // getting registration form field value
    const {fullname,emailId,password,contactNum,cityName}=req.body;
    // arranging data in comma seperated manner
    let data=`${fullname},${emailId},${password},${contactNum},${cityName}`

    // checking for user exists or not through fs module
    if(fs.existsSync(`./userData/${emailId}.txt`)){
        // rendering with error message
        res.render("registration",{errMsg:"Email already exist"})
    }
    else{
        // if userNot exist then write an email.txt file in userData directory
        fs.writeFile(`./userData/${emailId}.txt`,data,(err)=>{
            if(err){
                res.render("registration",{errMsg:"Something went Wrong"})   
            }else{
                // if successfully register rendering welcome page with emaildId through Param
                res.redirect("/user/welcome/"+emailId);
            }
        })
    }
});

// login function
const login=((req,res)=>{

    // getting login form field value
    const {emailId,password}=req.body;

    // check if user exist or not
    if(fs.existsSync(`./userData/${emailId}.txt`)){
        // storing a email.txt value in credentials variable in string format
        let credientials=fs.readFileSync(`./userData/${emailId}.txt`).toString();
        // converting comma seperated string to arrayString and accesing password value at index 2
        let savedPassword=credientials.split(',')[2];

        // check for password
        if(password==savedPassword){
            // succesPassword
            // if password match passing an email and username through param
            res.redirect("/user/welcome/"+`${emailId}/${credientials.split(',')[0]}`);
        }
        else{
            // if password doesn't match rendering a error message 
            res.render("login",{errPwdMsg:"Incorrect Password"})
        }
    }
    else{
        // Emailid Not Found
        res.render("login",{errEmlMsg:"Email Not Found"})
    }
});

module.exports={
    registration,login
}