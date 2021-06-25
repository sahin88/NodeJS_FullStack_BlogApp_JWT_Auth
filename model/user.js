const mongoose = require('mongoose')
const schema= mongoose.Schema;


const userSchema= mongoose.Schema({
    name:{
        type:String,
        required:true
    },

    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    }
    ,phone:{
        type:String
    }
},{timestamps:true})


const User= mongoose.model('User',userSchema);
module.exports=User;