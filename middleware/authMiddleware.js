const jwt = require('jsonwebtoken');

const authmiddleware = (req,res,next)=>{
const token = req.cookies.token;
if(!token){
    return res.redirect("/login");
}
try {
    const decode = jwt.verify(token,process.env.JWT_SECRET);
    req.user = decode;
    next();

} catch (error) {
    res.clearCookie('token');
    return res.redirect("/login");
}
}
module.exports = authmiddleware;