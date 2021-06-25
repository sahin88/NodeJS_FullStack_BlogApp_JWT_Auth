const { isObject, result } = require('lodash');
const { isValidObjectId } = require('mongoose');
const Blog=require('../model/blog.js');
var ObjectID = require('mongodb').ObjectID;
const activate_page=  require('../public/js/script.js')



const blog_paginated_index=(req, res)=>{

    res.render('index_paginated.ejs',{title:'All-Blogs | Blog',blogs:res.paginatedResult})
}

const blog_index=(req, res)=>{
    console.log(
        'activate_page', activate_page )
    Blog.find().sort({createdAt:-1})
    .then((result) => {
        
        res.render('index.ejs',{title:'All-Blogs | Blog',blogs:result});

    })
    .catch((err)=>{console.log("err",err)})

}

const blog_create =(req,res)=>{
    console.log("req.bof", req.formdata)
        const blog= new Blog(req.body)
        blog.save().then((result)=>{
            res.redirect('/blog/blog?page=1&limit=2')
        })
        .catch(()=>{})
    }


const blog_find_by_id=(req,res)=>{
    const id = req.params.id

    try {

        Blog.findById(id).then((result)=>{res.render('read_more.ejs',{title:'All-Blogs | Blog',blog:result})}).catch((err)=>{console.log("find_by_id_error", err)})
        
    } catch (error) {
        
    }


   
}

const blog_delete_by_id=(req,res)=>{
    const id = req.params.id
  
    Blog.findByIdAndDelete(id).then((result)=>{res.json({redirect:'/blog/blog?page=1&limit=2'})}).catch((error)=>{console.log("errrrrr", error)})
}



async function getPostLength(posts){
var length_of_db=null
await posts.find().then((response)=>{return  length_of_db=response.length}).catch((err)=>{console.log("err",err)})

return length_of_db

}
function iteratePageRange(page, limit, whole_pages){
    var start_iterate=null;
    var end_iterate=null;
    if(page-limit<=1){
        start_iterate=1

    }
    else{
        start_iterate=page-limit
    }

    var max_page=Math.ceil(whole_pages/limit);

    if(page+limit>max_page){
        end_iterate=max_page+1
    }
    else{
        end_iterate=page+limit
    }
    var result={"start_iterate":start_iterate,"end_iterate":end_iterate}

    return result;
}

function paginatedResult(posts){
  
    return async (req, res, next)=>{
        const limit=parseInt(req.query.limit);
        const page=parseInt(req.query.page);
        var token=null
        
      
        
        
        const startIndex=(page-1)*limit
        const lastIndex=page*limit
        const result={};
        result.result= await posts.find().sort({createdAt:-1}).limit(limit).skip(startIndex).exec()
        const whole_pages=await getPostLength(posts)

        try {
             token=req.query.token;
            console.log("token from pagination fucntuon", token)
           
        } catch (error) {
            
        }
        console.log("posts_length",startIndex)
        if(lastIndex<whole_pages){
            result.next={
                page:page+1,
                limit:limit,
            }
    
        }
    
        if(startIndex>0)
        {
            result.previous={
                page:page-1,
                limit:limit
            }
    
        }
        let response=iteratePageRange(page,limit,whole_pages);
        result.active_page=page
        result.start_iterate=response.start_iterate
        result.end_iterate=response.end_iterate
       
        if (token){
            result.token=token
        }
        else{
            result.token=token

        }
      
        
        res.paginatedResult=result;
      

        next()
        
      
    }

}
module.exports={
    blog_index
    ,blog_create,
    blog_find_by_id,
    blog_delete_by_id,
    blog_paginated_index,
    paginatedResult,
    
    
}

 