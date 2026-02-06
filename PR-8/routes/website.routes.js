const express = require("express");
const { homePage, aboutPage, contactPage } = require("../controller/website.controller");
const { getCart, saveCart, removeFromCart } = require("../controller/cart.controller");

const routes = express.Router();

routes.get("/", homePage);
routes.get("/about", aboutPage);
routes.get("/contact", contactPage);

// Cart API routes
routes.get("/api/cart", getCart);
routes.post("/api/cart/save", saveCart);
routes.post("/api/cart/remove", removeFromCart);

module.exports = routes;
