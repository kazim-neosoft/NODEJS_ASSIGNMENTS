const express=require('express');
const exphbs=require('express-handlebars');
const mongoose=require('mongoose');
const session=require('./middlewares/sessionMiddleware');
const router = require('./routes/route');
require('dotenv').config();//.env to hide the confedential data
const PORT=process.env.PORT;
const MONGODB_URI=process.env.DB_URI;//Mongo DB Connection

const app=express();

app.engine('handlebars', exphbs.engine({ helpers:{
    // Function to do basic mathematical operation in handlebar
    math: function(lvalue, operator, rvalue) {lvalue = parseFloat(lvalue);
        rvalue = parseFloat(rvalue);
        return {
            "+": lvalue + rvalue,
            "-": lvalue - rvalue,
            "*": lvalue * rvalue,
            "/": lvalue / rvalue,
            "%": lvalue % rvalue
        }[operator];
    },},
}));//setting up handlebars engine
app.set('view engine', 'handlebars');
app.set('views', './views');//setting up views 

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(session);

mongoose.connect(MONGODB_URI)
.then(res=>{console.log(`DB CONNECTED`);})
.catch(err=>{console.log(err.message);});//establishing connection with mongoDB

app.use('/',router)

app.use("*",(req,res)=>{
    res.status(404).render("404")
});//handling unwanted pages

app.listen(PORT,(err)=>{
    if(err) throw err;
    console.log(`listening on port :${PORT}`);
});//running server 