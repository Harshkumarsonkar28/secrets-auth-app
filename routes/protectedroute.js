const express = require('express');
const authmiddleware = require('../middleware/authMiddleware');
const route = express.Router();

route.get('/dashboard',authmiddleware,(req,res)=>{
    res.render('dashboard',{user:req.user});
})
module.exports = route