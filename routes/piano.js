const express = require('express')
const piano = express.Router()

piano.get('/',(req,res)=>{
    res.render('piano')
})
module.exports = piano