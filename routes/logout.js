const express = require('express')
const logout = express.Router()

logout.get('/',(req,res)=>{
    req.session.destroy(()=>{
        req.app.locals.user = null;
        res.clearCookie('connect.sid')
        res.redirect('/home')
    })
    // req.session.user = null;
    // req.app.locals.user = null;
    // res.redirect('/home')
})

module.exports = logout