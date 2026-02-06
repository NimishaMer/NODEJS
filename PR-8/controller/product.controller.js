const Product = require("../model/product.model");
const Category = require("../model/category.model");
const SubCategory = require("../model/subCategory.model");
const path = require("path");
const fs = require("fs");

exports.addProductPage = async (req, res) => {
    try {
        const categories = await Category.find({ status: "active" }).sort({ name: 1 });
        const subCategories = await SubCategory.find({ status: "active" }).populate("category").sort({ name: 1 });
        return res.render("product/addProduct", { categories, subCategories });
    } catch (error) {
        console.log(error);
        return res.redirect("/dashboard");
    }
}

exports.addProduct = async (req, res) => {
    try {
        let imagePath = "";
        if (req.file) {
            imagePath = `/uploads/${req.file.filename}`;
        }

        await Product.create({
            category: req.body.category,
            subCategory: req.body.subCategory,
            name: req.body.name,
            price: Number(req.body.price),
            description: req.body.description || "",
            status: req.body.status || "active",
            productImage: imagePath
        });

        req.flash('success', 'Add Product Success');
        return res.redirect("/product/add-product");
    } catch (error) {
        console.log(error);
        req.flash('error', 'Product Not Added');
        return res.redirect("/product/add-product");
    }
}

exports.viewProduct = async (req, res) => {
    try {
        const products = await Product.find()
            .populate("category")
            .populate("subCategory")
            .sort({ createdAt: -1 });

        return res.render("product/viewProduct", { products });
    } catch (error) {
        console.log(error);
        return res.redirect("/dashboard");
    }
}

exports.editProductPage = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        const categories = await Category.find().sort({ name: 1 });
        const subCategories = await SubCategory.find().sort({ name: 1 });
        return res.render("product/editProduct", { product, categories, subCategories });
    } catch (error) {
        console.log(error);
        return res.redirect("/product/view-product");
    }
}

exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            req.flash('error', 'Product Not Found');
            return res.redirect("/product/view-product");
        }

        let filepath = product.productImage;

        if (req.file) {
            if (product.productImage) {
                const relativeImagePath = String(product.productImage).replace(/^[\\/]+/, '');
                const oldpath = path.join(__dirname, '..', relativeImagePath);
                try {
                    if (fs.existsSync(oldpath)) {
                        fs.unlinkSync(oldpath);
                    }
                } catch (error) {
                    console.log('old file is missing');
                }
            }
            filepath = `/uploads/${req.file.filename}`;
        }

        await Product.findByIdAndUpdate(req.params.id, {
            category: req.body.category,
            subCategory: req.body.subCategory,
            name: req.body.name,
            price: Number(req.body.price),
            description: req.body.description || "",
            status: req.body.status,
            productImage: filepath
        }, { new: true });

        req.flash('success', 'Update Product Success');
        return res.redirect("/product/view-product");
    } catch (error) {
        console.log(error);
        req.flash('error', 'Product Not Updated');
        return res.redirect("/product/view-product");
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            req.flash('error', 'Product Not Found');
            return res.redirect("/product/view-product");
        }

        if (product.productImage) {
            const relativeImagePath = String(product.productImage).replace(/^[\\/]+/, '');
            const filePath = path.join(__dirname, '..', relativeImagePath);
            try {
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                }
            } catch (error) {
                console.log('Product image delete failed');
            }
        }

        await Product.findByIdAndDelete(req.params.id);
        req.flash('success', 'Delete Product Success');
        return res.redirect("/product/view-product");
    } catch (error) {
        console.log(error);
        req.flash('error', 'Product Not Deleted');
        return res.redirect("/product/view-product");
    }
}
