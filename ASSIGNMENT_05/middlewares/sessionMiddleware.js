const sessions=require('express-session');
const oneDay = 1000 * 60 * 60 * 24;
const cookieParser = require('cookie-parser');
require('dotenv').config();

const session=sessions({
    secret: process.env.SECRET_KEY,
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false
});

module.exports=session;