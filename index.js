const dotenv = require('dotenv');
const express = require('express');
const dbconnection = require('./config/db')
const authroute = require('./routes/authroute') 
const protectedroute = require('./routes/protectedroute');
const cookieparser = require('cookie-parser')
dotenv.config();
dbconnection();

const app = express();
app.use(express.urlencoded({extended:true}))
app.set("view engine","ejs");
app.use(express.json());
app.use(cookieparser());
app.use(express.static('public'));

const PORT = process.env.PORT || 3000
app.use('/',authroute)
app.use('/',protectedroute)


app.listen(PORT,()=>{
    console.log(`Server is start on http://localhost:${PORT}`);
})