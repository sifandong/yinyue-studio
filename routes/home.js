const express = require('express')
const home = express.Router()
home.get('/',async(req,res)=>{
    let user = res.locals.user
    res.render('home',{
        user:user
    })
})
module.exports = home