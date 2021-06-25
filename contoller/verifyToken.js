const jwt =require('jsonwebtoken');
const dotenv= require('dotenv');

dotenv.config()



const verifyToken=(req, res, next)=>{
    
    var authorizationtoken=req.header('auth-token');
    if (!authorizationtoken){res.error='Access denied'}
    try {
        var verified=jwt.verify(authorizationtoken, 'sahin');
        next();
        res.formdata=req.body
        
    } catch (error) {
        
    }

}




module.exports={
    verifyToken
}