const mongoose = require('mongoose')
const schema= mongoose.Schema;


const blogSchema= mongoose.Schema({
    title:{
        type:String,
        required:true
    },

    content:{
        type:String,
        required:true
    }
},{timestamps:true})


const Blog= mongoose.model('Blogs',blogSchema);
module.exports=Blog;