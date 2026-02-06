const express = require("express");
const { addSubCategoryPage, addSubCategory, viewSubCategory, editSubCategoryPage, updateSubCategory, deleteSubCategory } = require("../controller/subCategory.controller");

const routes = express.Router();

routes.get("/add-sub-category", addSubCategoryPage);
routes.post("/add-sub-category", addSubCategory);
routes.get("/view-sub-category", viewSubCategory);
routes.get("/edit-sub-category/:id", editSubCategoryPage);
routes.post("/update-sub-category/:id", updateSubCategory);
routes.get("/delete-sub-category/:id", deleteSubCategory);

module.exports = routes;
