const express=require('express');
const router=express.Router()
const Blog=require('../model/blog.js');
const blogController= require('../contoller/blogController')
const tokenObject=require('../contoller/verifyToken')
let multer = require('multer');
let upload = multer();
router.get('/',blogController.blog_index)


router.get('/blog',blogController.paginatedResult(Blog), blogController.blog_paginated_index)

router.post('/create',upload.fields([]),tokenObject.verifyToken,blogController.blog_create)

router.get('/:id',blogController.blog_find_by_id)

router.delete('/delete/:id',blogController.blog_delete_by_id)


module.exports=router;