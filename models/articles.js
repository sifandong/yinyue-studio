const mongoose = require('mongoose')


const articleSchema = new mongoose.Schema({
    title:{
        type: String,
        maxlength: 20,
        minlength: 1,
        required:[true,'请输入文章标题']
    },
    author:{
        type: mongoose.Types.ObjectId,
        ref:'User',
        required:[true,'请传递作者']
    },
    author_name:{
        type: String
    },
    publishDate: {
        type: Date,
        default: Date.now
    },
    cover:{
        type: String,
        default: null
    },
    cover_name:{
        type: String,
        
    },
    video:{
        type: String,
        default: null
    },
    video_name:{
        type: String,
    },
    abstract:{
        type: String
    },
    content:{
        type: String
    },
    like:{
        type: Number,
        
    }

})

const Article = mongoose.model('Article',articleSchema)
module.exports ={
    Article
}