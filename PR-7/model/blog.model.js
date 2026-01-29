const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
    title: {
        type: String
    },
    author: {
        type: String
    },
    category: {
        type: String
    },
    status: {
        type: String,
        enum: ['publish', 'draft']
    },
    tags: [{
        type: String
    }],
    publish_date: {
        type: Date
    },
    blogImage:{
        type: String
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    deletedAt: {
        type: Date,
        default: null
    }
});

module.exports = mongoose.model('blogs', blogSchema);