const express = require('express')
const path = require('path')
const article = express.Router()
const formidable = require('formidable')
// const { format } = require('path')
const { Article } = require('../models/articles')
const {User} = require('../models/users')
const pagination = require('mongoose-sex-page')


function substring(str, n) {
    if (str.replace(/[\u4e00-\u9fa5]/g, "**").length <= n) {
      return str;
    }
    else {
      var len = 0;
      var tmpStr = "";
      for (var i = 0; i < str.length; i++) {
        if (/[\u4e00-\u9fa5]/.test(str[i])) {
          len += 2;
        }
        else {
          len += 1;
        }
        if (len > n) {
          break;
        }
        else {
          tmpStr += str[i];
        }
      }
      return tmpStr + " ...";
    }
  };

article.get('/', async(req,res)=>{
    let page = req.query.page;
    let articles = await pagination(Article).find().page(page).size(5).display(4).sort({"publishDate":-1}).exec();
    
    
    // res.send(articless)
    res.render('article',{
        articles: articles,
    });
})
article.get('/detail', async(req,res)=>{
    let id = req.query.id;
    
    let article = await Article.findOne({_id:id})
    let user = await User.findOne({_id:article.author})
    
    res.render('article-detail',{
        article: article,
        user: user
    })
    
})

// article.post('/detail',(req,res)=>{
  
//     res.send(req.query)
// })

article.get('/edit',(req,res)=>{
    if(res.locals.user){
        res.render('article-edit')
    }else{
        res.render('log-in')
    }
})
article.post('/edit', (req,res)=>{
    const form = new formidable.IncomingForm();
    form.uploadDir = path.join(__dirname,'../','public','uploads')
    form.keepExtensions = true
    form.parse(req, async (err,fields,files)=>{
        let abstract = substring(fields.content,200)
        let temp = await User.findOne({_id:fields.author})
        author_name = temp.username
        await Article.create({
            title: fields.title,
            author: fields.author,
            author_name: author_name,
            publishDate: fields.publishDate,
            cover: files.cover.path.split('public')[1],
            cover_name: fields.cover_name,
            video: files.video.path.split('public')[1],
            video_name: fields.video_name,
            abstract: abstract,
            content: fields.content,
            like:0,
        })
        
        res.redirect('/article')
    })



    
})

module.exports = article