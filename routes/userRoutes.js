const express=require('express');
const router=express.Router()
const User=require('../model/user.js');
const userController= require('../contoller/userController')



router.post('/register',userController.register)
router.post('/login',userController.login_user)
router.get('/all_user',userController.all_user)



module.exports=router;