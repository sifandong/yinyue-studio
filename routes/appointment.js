const express = require('express')
const appointment = express.Router()

appointment.get('/',(req,res)=>{
    if(req.app.locals.user){
        res.render('appointment')
    }else{
        res.render('log-in')
    }
})
module.exports = appointment