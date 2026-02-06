const express = require("express");
const { dashboardpage, loginpage, loginUser, logOutUser, myprofile, changePasswordPage, changePassword, } = require("../controller/auth.controller");
const passport = require("passport");

const routes = express.Router();

routes.get("/", loginpage)
routes.post("/login", passport.authenticate('local', { failureRedirect: '/', failureFlash: 'Invalid email or password' }), loginUser)

routes.use("/website", require("./website.routes"));

routes.get("/dashboard", passport.checkAuthicate, dashboardpage);
routes.get("/profile",passport.checkAuthicate, myprofile);
routes.get("/change-password",passport.checkAuthicate, changePasswordPage);
routes.post("/changepassword",passport.checkAuthicate, changePassword);


routes.get("/logOutUser",passport.checkAuthicate, logOutUser)


routes.use("/admin",passport.checkAuthicate, require("./admin.routes"));
routes.use("/blog",passport.checkAuthicate, require("./blog.routes"));

routes.use("/category", passport.checkAuthicate, require("./category.routes"));
routes.use("/sub-category", passport.checkAuthicate, require("./subCategory.routes"));
routes.use("/product", passport.checkAuthicate, require("./product.routes"));

module.exports = routes;