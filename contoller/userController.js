const User =require('../model/user.js');
const bcrypt=require('bcrypt');
const jwt= require('jsonwebtoken');
const { paginatedResult } = require('./blogController.js');
const Joi=require('@hapi/joi');
const dotenv=require('dotenv');
dotenv.config()




const schema={
    name:Joi.string().min(6).required(),
    email:Joi.string().min(6).required().email(),
    password:Joi.string().min(6).required(),
    phone:Joi.string().min(6),


}

const register=(req, res)=>{
    const {error} =Joi.validate(req.body, schema)
    if(error){
        console.log("error",error.details[0].message)
        var message=error.details[0].message.replace(/['"]+/g, '')

        return res.render('register.ejs',{title:'Blog | Register', message:messageg})
    }
   
    bcrypt.hash(req.body.password,10,(err, hashedPassword)=>{
        let user = new User({
            name:req.body.name,
            email:req.body.email,
            phone:req.body.phone,
            password:hashedPassword
        })

        user.save().then((response)=>{ res.redirect('/login')}).catch((err)=>{console.log("err", err)})

        });



  

    
}


const login_user=(req, response)=>{
    var email= req.body.email;
    var password=req.body.password;
    console.log(email, password, )
    try {
        console.log("token",  req.header('authorizationtoken'))
    } catch (error) {
        
    }
    User.findOne({email:email}, (err,myUser)=>{
  
        if(err){
    
        }
        if (myUser){
            console.log("myUser", myUser)
            bcrypt.compare(password, myUser.password,(err, res)=>{
                if(err){
                }
                else{
                    let token=jwt.sign({email:myUser.email}, 'sahin',{expiresIn:'48h'})
                   
                    response.header({'authorizationtoken': token});
                    response.redirect(`../blog/blog?page=1&limit=2&token=${token}`);

                    
                }
            })
        }
    })

}

 const token_verification=(req, res, next)=>{
 
 }

 const all_user=(req, res)=>{

    User.find().then((response)=>{res.json(response)}).catch(err=>{console.log("err")})
 }
module.exports={register, 
             login_user, all_user}



