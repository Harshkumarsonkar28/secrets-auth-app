const validateRegister =(req,res,next)=>{
const {name,email,password} = req.body;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;

if(!name || !email || !password){
    return res.render("register",{error:"All fields are required"});
}
if(!emailRegex.test(email)){
    return res.render("register",{error:"Invalid email format"});
}

if(!passRegex.test(password)){
    return res.render("register",{error:"Password must contain uppercase, lowercase, number, and min 6 characters"})
}
next();
}

const validateLogin = (req,res,next)=>{
const {email,password} = req.body;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if(!email || !password){
    return res.render("login",{error:"Email and password are required"})
}

if(!emailRegex.test(email)){
    return res.render("register",{error:"Invalid email format"});
}

next()
}

module.exports = {validateRegister,validateLogin}