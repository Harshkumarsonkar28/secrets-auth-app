const User = require('../models/Usermodel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registerUser = async(req,res)=>{
    const {name ,email,password} = req.body;
    try {
        const emailexist = await User.findOne({email});
        if(emailexist){
        return res.render("register",{error:"Email Already Exists"});
        }
        const hashedpassword = await bcrypt.hash(password, 10);
        await User.create({name ,email , password :hashedpassword});
        return res.redirect("/login");
    } catch (error) {
        return res.render("register",{error:"Something Wents Wrong"});
    }
}

exports.loginUser = async(req,res)=>{
    const {email,password} = req.body;
    try {
        const user = await User.findOne({email});
        if(!user){
            return res.render('login',{error:"Invalid credentials"})
        }
        const checkpwd = await bcrypt.compare(password , user.password);
        if(!checkpwd){
            return res.render("login",{error:"Invalid credentials"})
        }

       const token = jwt.sign({id : user._id,name : user.name,email : user.email},
        process.env.JWT_SECRET,
        {expiresIn:process.env.JWT_EXPIRE || '1d'});

        // store token inhttp
      res.cookie('token',token,{
        httpOnly : true,
        secure : String(process.env.COOKIE_SECURE).toLowerCase() === 'true',
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 * 1000      
      })

      res.redirect('/dashboard');

    } catch (error) {
        return res.render('login', { error: 'Something went wrong' });
    }
}

exports.logoutUser = (req,res)=>{
    res.clearCookie('token');
    return res.redirect('/login')
}