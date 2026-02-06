const Blog = require('../model/blog.model');
const bcrypt = require("bcrypt");
const path = require("path");
const fs = require('fs')

exports.addBlogPage = async (req, res) => {
    try {
        // let admin = req.user;
        return res.render("blog/addBlog")
    } catch (error) {
        console.log(error);
        return res.redirect("/dashboard");
    }
}

exports.viewBlog = async (req, res) => {
    try {
        // let admin = req.user;
        let blogs = await Blog.find().sort({ publish_date: -1 });
        let categories = [...new Set(blogs.map(blog => blog.category).filter(Boolean))];
        return res.render("blog/viewBlog", { blogs, categories })
    } catch (error) {
        console.log(error);
        return res.redirect("/dashboard");
    }
}

exports.editBlogPage = async (req, res) => {
    try {
        // let admin = req.user;
        let blog = await Blog.findById(req.params.id);
        return res.render("blog/editBlog", { blog })
    } catch (error) {
        console.log(error);
        return res.redirect("/dashboard");
    }
}

exports.singleView = async (req, res) => {
    try {
        // let admin = req.user;
        let blog = await Blog.findById(req.params.id);
        return res.render("blog/singleView", { blog })
    } catch (error) {
        console.log(error);
        return res.redirect("/dashboard");
    }
}

exports.deleteBlog = async (req, res) => {
    try {
        let blog = await Blog.findById(req.params.id);
        if (!blog) {
            req.flash('error', 'Blog Not Found');
            return res.redirect("/blog/view-blog")
        }

        if (blog.blogImage) {
            const relativeImagePath = String(blog.blogImage).replace(/^[\\/]+/, '');
            const filePath = path.join(__dirname, '..', relativeImagePath);
            try {
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                }
            } catch (error) {
                console.log('Blog image delete failed');
            }
        }

        await Blog.findByIdAndDelete(req.params.id);

        req.flash('success', 'Delete Blog Success');
        return res.redirect("/blog/view-blog")
    } catch (error) {
        console.log(error);
        return res.redirect("/dashboard");
    }
}

exports.addblog = async (req, res) => {
    try {
        let imagePath = "";
        if (req.file) {
            imagePath = `/uploads/${req.file.filename}`;
        }

        let newBlog = await Blog.create({
            ...req.body,
            blogImage: imagePath
        });
        req.flash('success', 'Add Blog Success');
        return res.redirect("/blog/add-blog")
    } catch (error) {
        console.log(error);
        return res.redirect("/dashboard");
    }
}

exports.updateBlog = async (req, res) => {
    try {
        let blog = await Blog.findById(req.params.id);

        if (!blog) {
            console.log('Blog Not Found !');
            return res.redirect("/dashboard");
        }

        let filepath = blog.blogImage;

        if (req.file) {
            if (blog.blogImage != '') {
                let oldpath = path.join(__dirname, '..', blog.blogImage);
                try {
                    await fs.unlinkSync(oldpath);
                } catch (error) {
                    console.log('old file is missing');
                }
            }
            filepath = `/uploads/${req.file.filename}`;
        }
        await Blog.findByIdAndUpdate(req.params.id, {
            ...req.body,
            blogImage: filepath
        }, { new: true })

        req.flash('success', 'Update Blog Success');
        return res.redirect("/blog/view-blog")

    } catch (error) {
        console.log(error);
        return res.redirect("/dashboard");
    }
}