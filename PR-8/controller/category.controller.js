const Category = require("../model/category.model");

exports.addCategoryPage = async (req, res) => {
    try {
        return res.render("category/addCategory");
    } catch (error) {
        console.log(error);
        return res.redirect("/dashboard");
    }
}

exports.addCategory = async (req, res) => {
    try {
        await Category.create({
            name: req.body.name,
            status: req.body.status || "active"
        });
        req.flash('success', 'Add Category Success');
        return res.redirect("/category/add-category");
    } catch (error) {
        console.log(error);
        req.flash('error', 'Category Not Added');
        return res.redirect("/category/add-category");
    }
}

exports.viewCategory = async (req, res) => {
    try {
        const categories = await Category.find().sort({ createdAt: -1 });
        return res.render("category/viewCategory", { categories });
    } catch (error) {
        console.log(error);
        return res.redirect("/dashboard");
    }
}

exports.editCategoryPage = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        return res.render("category/editCategory", { category });
    } catch (error) {
        console.log(error);
        return res.redirect("/category/view-category");
    }
}

exports.updateCategory = async (req, res) => {
    try {
        await Category.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            status: req.body.status
        }, { new: true });

        req.flash('success', 'Update Category Success');
        return res.redirect("/category/view-category");
    } catch (error) {
        console.log(error);
        req.flash('error', 'Category Not Updated');
        return res.redirect("/category/view-category");
    }
}

exports.deleteCategory = async (req, res) => {
    try {
        await Category.findByIdAndDelete(req.params.id);
        req.flash('success', 'Delete Category Success');
        return res.redirect("/category/view-category");
    } catch (error) {
        console.log(error);
        req.flash('error', 'Category Not Deleted');
        return res.redirect("/category/view-category");
    }
}
