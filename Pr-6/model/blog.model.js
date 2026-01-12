const mongoose= require('mongoose');
const blogSchema = mongoose.Schema({
    title:{
        type :String
    },
    author:{
        type:String
    },
    category:{
        type:String
    },
    tags:{
        type:String
    },
    shortDesc:{
        type:String
    },
    image:{
        type:String
    },
    status:{
        type:String
    },
    publishDate:{
        type:String
    },
});
module.exports = mongoose.model('blog',blogSchema);