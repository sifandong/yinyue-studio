const express = require('express')
const login = express.Router()
const {User} = require('../models/users')
const bcrypt = require('bcryptjs')


login.get('/',(req,res)=>{
    res.render('log-in')
})


login.post('/',async (req,res)=>{
    // res.send(req.body)
   
    const {email,password} = req.body;
    if(email.trim().length == 0 || password.trim().length == 0){
        return res.status(400).render('log-in',{msg:'邮箱或密码不能为空'});  
    }
     let user = await User.findOne({email});
    
    
    // let isValid = password == user.password;
    //
     if(user){
        let isValid = bcrypt.compareSync(password,user.password)
        
        if(isValid){
            req.session.user = user;
            req.app.locals.user = user;
            res.redirect('/home');
        }else{
            res.status(400).render('log-in',{msg:'邮箱或者密码错误'})
        }
     }else{
        return res.status(400).render('log-in',{msg:'账户不存在或邮箱不正确'})
     }

})




module.exports = login