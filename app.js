const express= require('express');
const morgan= require('morgan')
const app= express();
const mongoose=require('mongoose');
const dotenv=require('dotenv');
dotenv.config();
const { result } = require('lodash');

const { urlencoded } = require('express');

const blogRoouter=require('./routes/blogRoutes.js')
const userRoouter=require('./routes/userRoutes.js')




// connect to Database
// mongodb+srv://sahin_88:sahinAa1!@cluster0.r53by.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
const dbURI=process.env.DB_CONNET;
mongoose.connect(dbURI,{useNewUrlParser:true,useUnifiedTopology:true}).then((result)=>{console.log("connected succesfully")}).catch((err)=>{
    console.log("errror_mongoose", err)
})
app.listen(3000)
app.set('view engine','ejs')
app.use(express.static(__dirname + '/public'));
app.use(urlencoded({extended:true}))
app.use(morgan('tiny'))
app.get('/',(req,res)=>{
    res.redirect('/blog/blog?page=1&limit=2')
})


app.get('/about',(req,res)=>{
    res.render('about.ejs',{title:'About| Blog'})
})




app.get('/about-us',(req,res)=>{
    res.status(301).redirect('/about.html')
})


app.get('/login',(req,res)=>{
    console.log("re", req.header('auth-token'))
    res.render('login.ejs',{title:'Login| Blog'})
})

app.get('/register',(req,res)=>{
    const error={message:'hello'}
    res.render('register.ejs',{title:'Register| Blog',message:''})
})

app.use('/user',userRoouter)
app.use('/blog',blogRoouter)


app.use((req,res)=>{
    res.render('404.ejs',{title:'404 Not Found | Blog'})})

