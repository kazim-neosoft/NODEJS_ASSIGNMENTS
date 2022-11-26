const express=require('express');
const exphbs=require('express-handlebars');
const PORT=7899;
const app=express();

// Inbuild middleware 
app.use(express.json());
app.use(express.urlencoded({extended:false}));

const mainRoutes=require('./routes/mainRoutes');
const userRoutes=require('./routes/userRoutes');

// setting a handlebars view
app.engine('handlebars',exphbs.engine());
app.set('view engine','handlebars');
app.set('views','./views');

// setting up routes
app.use("/",mainRoutes);
app.use("/user",userRoutes);

// handling unwanted request
app.use("*",(req,res)=>{
    res.status(404).render("404")
})


app.listen(PORT,(err)=>{
    if(err) throw err;
    console.log(`listening on :${PORT}`);
})