const express=require('express');
const exphbs=require('express-handlebars');
const mongoose=require('mongoose');
const session = require('./middlewares/sessionMiddleware');
const userRoutes = require('./routes/userRoutes');

require('dotenv').config();
const MONGODB_URI=process.env.DB_URI;

const app=express();
const PORT=process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static("./controllers/uploads/"))
app.use(session);

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars');
app.set('views', './views');

mongoose.connect(MONGODB_URI)
.then(res=>{console.log(`DB CONNECTED`);})
.catch(err=>{console.log(err.message);})


app.use("/",userRoutes);

app.listen(PORT,(err)=>{
    if(err) throw err;
    console.log(`listening on port :${PORT}`);
})
