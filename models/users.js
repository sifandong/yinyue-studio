const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    username:{
        type: String,
        trim: true,
        required: true,
        minlength: 1,
        maxlength: 15
    },
    password: {
        type: String,
        required: true
    },
    email:{
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    avatar:{
        type: String,
    }
    
})
const User = mongoose.model('User',userSchema)

// User.create({
//     username: 'sifan',
//     email: 'sdong09@syr.edu',
//     password: '123456',
//     isAdmin: true,
//     state: 0
// }).then(()=>{
//     console.log('user creation successed')
// }).catch(()=>{
//     console.log('user creation failed')
// })
module.exports = {
    User
}