const express=require('express');
const fs=require("fs");
const app=express()
const PORT=9999

// setting pug view engine 
app.set('view engine','pug');
app.set('views','./views');

// using inbuilt middleware
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
    // creating data variable and formatting the table row and table data
    const data=`
tr
 td ${fullName}
 td ${email}
 td ${phoneNumber}
 `
    // checking if file exist or not
    if(fs.existsSync('./contactdata/details.pug')){
        // if exist update data
        fs.appendFileSync('./contactdata/details.pug',data.toString(),"utf8");
        
    }else{
        // if not write new file with name details.pug
        fs.writeFileSync('./contactdata/details.pug',data.toString(),"utf8");
    }
    res.render("contactDetails")
})

// for rendering contact details
app.get("/details",(req,res)=>{
    res.render("contactDetails")
})

// handling unwanted request and render 404 page
app.use("*",(req,res)=>{
    res.status(404).render("404")
})

// listening on port 
app.listen(PORT,(err)=>{
    if(err) throw err;
    console.log(`listening at port ${PORT}`);
})