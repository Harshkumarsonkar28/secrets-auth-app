const express = require('express');
const {validateRegister,validateLogin} = require('../middleware/validateAuth');
const {registerUser,loginUser,logoutUser} = require('../controllers/authcontroller')
const route = express.Router();

route.get('/',(req,res)=>{
    res.render("home")
})

route.get('/register',(req,res)=>{
    res.render("register",{ error: '' });
})
route.post('/register',validateRegister,registerUser);

route.get('/login',(req,res)=>{
    res.render("login",{error:''})
})
route.post('/login',validateLogin,loginUser);

route.get('/logout',logoutUser);

module.exports = route