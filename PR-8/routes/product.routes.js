const express = require("express");
const { addProductPage, addProduct, viewProduct, editProductPage, updateProduct, deleteProduct } = require("../controller/product.controller");
const uploadImage = require("../middleware/imageUpload");

const routes = express.Router();

routes.get("/add-product", addProductPage);
routes.post("/add-product", uploadImage.single('productImage'), addProduct);
routes.get("/view-product", viewProduct);
routes.get("/edit-product/:id", editProductPage);
routes.post("/update-product/:id", uploadImage.single('productImage'), updateProduct);
routes.get("/delete-product/:id", deleteProduct);

module.exports = routes;
