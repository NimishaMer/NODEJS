const express = require('express');
const { addAdminPage, addadmin, viewAdmin, deleteAdmin, updateAdmin, editAdminPage, singleView } = require('../controller/admin.controller');
const uploadImage = require("../middleware/imageUpload");

const routes = express.Router();

routes.get("/add-admin", addAdminPage);

routes.get("/view-admin", viewAdmin);

routes.post("/add-admin", uploadImage.single('adminImage'), addadmin);

routes.get("/delete-admin/:id", deleteAdmin);

routes.post("/update-admin/:id", uploadImage.single('adminImage'), updateAdmin);

routes.get("/edit-admin/:id", editAdminPage);

routes.get("/single-view/:id", singleView);

module.exports = routes;