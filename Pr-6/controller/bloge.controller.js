const blogModel = require('../model/blog.model');
const fs = require('fs');
const path = require('path');

/* ================= ADD BLOG PAGE ================= */
exports.addBlogPage = async (req, res) => {
    try {
        return res.render("blog/addBlog");
    } catch (err) {
        console.log(err);
        return res.redirect("/dashBoard");
    }
};

/* ================= VIEW BLOGS ================= */
exports.viewBlogs = async (req, res) => {
    try {
        let blogs = await blogModel.find();
        return res.render("blog/viewBlogs", { blogs });
    } catch (err) {
        console.log(err);
        return res.redirect("/dashBoard");
    }
};

/* ================= ADD BLOG ================= */
exports.addBlog = async (req, res) => {
    try {
        let imagePath = "";

        if (req.file) {
            imagePath = "/uploads/" + req.file.filename;
        }

        await blogModel.create({
            ...req.body,
            image: imagePath
        });

        return res.redirect("/blog/view-blogs");
    } catch (err) {
        console.log(err);
        return res.redirect("/blog/add-blog");
    }
};

/* ================= EDIT BLOG PAGE ================= */
exports.editBlogPage = async (req, res) => {
    try {
        let blog = await blogModel.findById(req.params.id);
        if (!blog) {
            return res.redirect("/blog/view-blogs");
        }
        return res.render("blog/editBlog", { blog });
    } catch (err) {
        console.log(err);
        return res.redirect("/blog/view-blogs");
    }
};
exports.viewSingleBlog = async (req, res) => {
    try {
        const blogs = await blogModel.findById(req.params.id);

        if (!blogs) {
            return res.redirect("/blog/single-view");
        }

        return res.render("blog/singlecard", { blogs });
    } catch (err) {
        console.log(err);
        return res.redirect("/blog/view-blogs");
    }
};


/* ================= UPDATE BLOG ================= */
exports.updateBlog = async (req, res) => {
    try {
        let blog = await blogModel.findById(req.params.id);
        if (!blog) {
            return res.redirect("/blog/view-blogs");
        }

        let imagePath = blog.image;

        if (req.file) {
            if (blog.image) {
                let oldImgPath = path.join(__dirname, "..", blog.image);
                if (fs.existsSync(oldImgPath)) {
                    fs.unlinkSync(oldImgPath);
                }
            }
            imagePath = "/uploads/" + req.file.filename;
        }

        await blogModel.findByIdAndUpdate(req.params.id, {
            ...req.body,
            image: imagePath
        });

        return res.redirect("/blog/view-blogs");
    } catch (err) {
        console.log(err);
        return res.redirect("/blog/view-blogs");
    }
};

/* ================= DELETE BLOG ================= */
exports.deleteBlog = async (req, res) => {
    try {
        let blog = await blogModel.findById(req.params.id);
        if (!blog) {
            return res.redirect("/blog/view-blogs");
        }

        if (blog.image) {
            let imgPath = path.join(__dirname, "..", blog.image);
            if (fs.existsSync(imgPath)) {
                fs.unlinkSync(imgPath);
            }
        }

        await blogModel.findByIdAndDelete(req.params.id);
        return res.redirect("/blog/view-blogs");
    } catch (err) {
        console.log(err);
        return res.redirect("/blog/view-blogs");
    }
};
