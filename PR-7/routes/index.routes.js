const express = require("express");
const { dashboardpage, loginpage, loginUser, logOutUser, myprofile, changePasswordPage, changePassword, } = require("../controller/auth.controller");
const passport = require("passport");

const routes = express.Router();

routes.get("/", loginpage)
routes.post("/login", passport.authenticate('local', { failureRedirect: '/' }), loginUser)
routes.get("/dashboard", passport.checkAuthicate, dashboardpage);
routes.get("/profile",passport.checkAuthicate, myprofile);
routes.get("/change-password",passport.checkAuthicate, changePasswordPage);
routes.post("/changepassword",passport.checkAuthicate, changePassword);


routes.get("/logOutUser",passport.checkAuthicate, logOutUser)


routes.use("/admin",passport.checkAuthicate, require("./admin.routes"));
routes.use("/blog",passport.checkAuthicate, require("./blog.routes"));

module.exports = routes;