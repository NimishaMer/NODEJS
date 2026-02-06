exports.homePage = async (req, res) => {
    try {
        const Product = require("../model/product.model");
        const products = await Product.find({ status: "active" })
            .populate("category")
            .populate("subCategory")
            .sort({ createdAt: -1 })
            .limit(12);

        return res.render("website/home", { products });
    } catch (error) {
        console.log(error);
        return res.redirect("/");
    }
}

exports.aboutPage = async (req, res) => {
    try {
        return res.render("website/about");
    } catch (error) {
        console.log(error);
        return res.redirect("/");
    }
}

exports.contactPage = async (req, res) => {
    try {
        return res.render("website/contact");
    } catch (error) {
        console.log(error);
        return res.redirect("/");
    }
}
