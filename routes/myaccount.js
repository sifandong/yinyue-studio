const express = require('express')
const  myaccount = express.Router()
const {User} = require('../models/users')
const {Article} = require('../models/articles')


myaccount.get('/', async (req,res)=>{
    let id = req.query.user_id
    let user = await User.findOne({_id:id})
    
    let collection = await Article.find().populate('author')
    collection = JSON.stringify(collection)
    collection = JSON.parse(collection)
    
    if(req.app.locals.user){
        


        res.render('myaccount',{
            user: user,
            collection: collection
        })
    }else{
        res.render('log-in')
    }
})

myaccount.get('/article',async(req,res)=>{ 
    let id = req.query.id
    let article = await Article.findOne({_id:id})
    let user = await User.findOne({_id:article.author})
    // res.send(user)
    res.render('article-detail',{
        article: article,
        user: user
    })
})
myaccount.get('/video',async(req,res)=>{
    let id = req.query.id
    let article = await Article.findOne({_id:id})
   
    res.render('myaccount-video',{
        article: article,
        
    })
})
myaccount.get('/image',async(req,res)=>{
    let id = req.query.id
    let article = await Article.findOne({_id:id})
   
    res.render('myaccount-image',{
        article: article,
        
    })
    
})
myaccount.get('/myAppointment',(req,res)=>{
    
})

module.exports = myaccount