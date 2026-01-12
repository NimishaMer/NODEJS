const express = require('express');
const { dashBordpage, loginPage } = require('../controller/auth.controller');
const routes = express.Router();

routes.get('/dashboard',dashBordpage);
routes.get("/",loginPage);

routes.use("/blog",require("./blog.routes"));
module.exports = routes;


