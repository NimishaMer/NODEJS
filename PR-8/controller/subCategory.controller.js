const Category = require("../model/category.model");
const SubCategory = require("../model/subCategory.model");

exports.addSubCategoryPage = async (req, res) => {
    try {
        const categories = await Category.find({ status: "active" }).sort({ name: 1 });
        return res.render("subCategory/addSubCategory", { categories });
    } catch (error) {
        console.log(error);
        return res.redirect("/dashboard");
    }
}

exports.addSubCategory = async (req, res) => {
    try {
        await SubCategory.create({
            category: req.body.category,
            name: req.body.name,
            status: req.body.status || "active"
        });
        req.flash('success', 'Add Sub Category Success');
        return res.redirect("/sub-category/add-sub-category");
    } catch (error) {
        console.log(error);
        req.flash('error', 'Sub Category Not Added');
        return res.redirect("/sub-category/add-sub-category");
    }
}

exports.viewSubCategory = async (req, res) => {
    try {
        const subCategories = await SubCategory.find().populate("category").sort({ createdAt: -1 });
        return res.render("subCategory/viewSubCategory", { subCategories });
    } catch (error) {
        console.log(error);
        return res.redirect("/dashboard");
    }
}

exports.editSubCategoryPage = async (req, res) => {
    try {
        const categories = await Category.find().sort({ name: 1 });
        const subCategory = await SubCategory.findById(req.params.id);
        return res.render("subCategory/editSubCategory", { categories, subCategory });
    } catch (error) {
        console.log(error);
        return res.redirect("/sub-category/view-sub-category");
    }
}

exports.updateSubCategory = async (req, res) => {
    try {
        await SubCategory.findByIdAndUpdate(req.params.id, {
            category: req.body.category,
            name: req.body.name,
            status: req.body.status
        }, { new: true });

        req.flash('success', 'Update Sub Category Success');
        return res.redirect("/sub-category/view-sub-category");
    } catch (error) {
        console.log(error);
        req.flash('error', 'Sub Category Not Updated');
        return res.redirect("/sub-category/view-sub-category");
    }
}

exports.deleteSubCategory = async (req, res) => {
    try {
        await SubCategory.findByIdAndDelete(req.params.id);
        req.flash('success', 'Delete Sub Category Success');
        return res.redirect("/sub-category/view-sub-category");
    } catch (error) {
        console.log(error);
        req.flash('error', 'Sub Category Not Deleted');
        return res.redirect("/sub-category/view-sub-category");
    }
}
