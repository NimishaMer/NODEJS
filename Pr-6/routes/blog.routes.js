const express = require('express');
const {
    addBlogPage,
    addBlog,
    viewBlogs,
    editBlogPage,
    updateBlog,
    deleteBlog,
    viewSingleBlog
} = require('../controller/bloge.controller');

const uploadImage = require('../middleware/imageUpload');

const routes = express.Router();

routes.get('/add-blog', addBlogPage);
routes.post('/add-blog', uploadImage.single('image'), addBlog);

routes.get('/view-blogs', viewBlogs);

routes.get('/edit-blog/:id', editBlogPage);
routes.post('/update-blog/:id', uploadImage.single('image'), updateBlog);

routes.get('/delete-blog/:id', deleteBlog);
routes.get("/single-view/:id", viewSingleBlog);



module.exports = routes;
