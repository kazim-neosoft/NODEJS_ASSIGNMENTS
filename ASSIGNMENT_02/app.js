const express=require('express');
const fs=require("fs");
const app=express()
const PORT=9999

app.set('view engine','pug');
app.set('views','./views');

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use("/static",express.static('public'))

app.get("/",(req,res)=>{
    res.render("index")
})

app.get("/about",(req,res)=>{
    res.render("about")
})

app.get("/gallery",(req,res)=>{
    res.render("gallery")
})

app.get("/service",(req,res)=>{
    res.render("services")
})

app.get("/contact",(req,res)=>{
    res.render("contact")
})

app.post("/submitdata",(req,res)=>{
    const fullName=req.body.name;
    const email=req.body.email;
    const phoneNumber=req.body.phnNumber;
    const data=`
tr
 td ${fullName}
 td ${email}
 td ${phoneNumber}
 `

    if(fs.existsSync('./contactdata/details.pug')){
        fs.appendFileSync('./contactdata/details.pug',data.toString(),"utf8");
        
    }else{
        fs.writeFileSync('./contactdata/details.pug',data.toString(),"utf8");
    }
    res.render("contactDetails")
})

app.get("/details",(req,res)=>{
    res.render("contactDetails")
})

app.use("*",(req,res)=>{
    res.status(404).render("404")
})

app.listen(PORT,(err)=>{
    if(err) throw err;
    console.log(`listening at port ${PORT}`);
})