const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const session = require('express-session')
const template = require('art-template')
const dateFormat = require('dateformat')

const app = express()



//连接数据库
const uri = "mongodb+srv://yinyue-studio-admin:Gtech19891020*@yinyue-studio.3qitu.mongodb.net/yinyue-studio?retryWrites=true&w=majority"
mongoose.connect(uri,{ useUnifiedTopology: true,useNewUrlParser: true, useCreateIndex: true })
    .then(()=>{console.log('database connection succeeded')})
    .catch(()=>{console.log('database connection failed')})

//处理post请求参数
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//session&cookie
app.use(session({
    secret:'key_secret',
    resave: false,
    saveUninitialized: false,
    cookie:{
        maxAge: 30*24*60*60*1000
    }
}))

//模板设置
app.set('views',path.join(__dirname,'views'))
app.set('view engine','art')
app.engine('art',require('express-art-template'))

template.defaults.imports.dateFormat = dateFormat



//静态资源
app.use(express.static(path.join(__dirname,'public')))



//登录拦截
app.use((req,res,next)=>{
    if(req.session.user){
        res.locals.user = req.session.user;
    }
    next();
})

app.use('/',(req,res)=>{
    console.log('yes');
    res.redirect('/home')
})

//home路由
const home = require('./routes/home')
const register = require('./routes/register')
const login = require('./routes/login')
const logout = require('./routes/logout')
const article = require('./routes/article')
const piano = require('./routes/piano')
const appointment = require('./routes/appointment')
const myaccount = require('./routes/myaccount')
const { Cookie } = require('express-session')
app.use('/home',home)
app.use('/register',register)
app.use('/login',login)
app.use('/logout',logout)
app.use('/article',article)
app.use('/piano',piano)
app.use('/appointment',appointment)
app.use('/myaccount',myaccount)

const port = process.env.PORT || 3000
app.listen(port,()=>{
    console.log('wuhoooo')
})
