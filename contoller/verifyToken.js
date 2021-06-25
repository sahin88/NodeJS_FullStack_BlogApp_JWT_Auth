const jwt =require('jsonwebtoken');
const dotenv= require('dotenv');

dotenv.config()



const verifyToken=(req, res, next)=>{
    
    var authorizationtoken=req.header('auth-token');
    if (!authorizationtoken){res.error='Access denied'}
    console.log("temiz olmus",req.body)

    try {
        
        var verified=jwt.verify(authorizationtoken, 'sahin');
        // console.log("veried", verified)
        // req.user= verified;
        // console.log("sezgin baran korkmaz", req.user)
        console.log(verified)
        next();
        res.formdata=req.body
        
    } catch (error) {
        console.log("salih usta", error)
        
    }

}




module.exports={
    verifyToken
}