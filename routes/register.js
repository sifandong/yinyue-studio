const express = require('express')
const register = express.Router()
const bcrypt = require('bcryptjs')
const joi_schema = require('../models/joi_schema')
const {User} = require('../models/users')


register.get('/',(req,res)=>{
    res.render('register')
})

register.post('/',async (req,res)=>{
    if(req.body.password != req.body.repeat_password){
        res.status(400).render('register',{msg:'密码不一致,请重新输入'})
    }
    const {value,error} = await joi_schema.validate(req.body);
    
    if(error){
        let display = error.message
        res.status(400).render('register',{msg:display})
    }else{
        let user = await User.findOne({email:req.body.email});
        if(user){
            res.status(400).render('log-in',{msg:'用户已存在，请登录'})
        }else{
            let salt = bcrypt.genSaltSync(10);
            let hash = bcrypt.hashSync(req.body.password,salt);
            req.body.password = hash;
            await User.create(req.body)
            res.redirect('/login')
        }
    }
    
    
})
module.exports = register