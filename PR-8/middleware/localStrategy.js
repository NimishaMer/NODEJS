const passport = require("passport");
const Blog = require("../model/blog.model");
const Admin = require('../model/admin.model');
const bcrypt = require("bcrypt");

const LocalStrategy = require("passport-local").Strategy;

passport.use(new LocalStrategy({ usernameField: 'email'}, async(email, password, cb) =>{
    try {
        let admin = await Admin.findOne({email: email});

        if(!admin){
            return cb(null, false);
        }
        let matchpass = await bcrypt.compare(password, admin.password)
        if(!matchpass){
            return cb(null, false);
        }
        return cb(null, admin);
    } catch (error) {
        return cb(error);
    }
}))

passport.serializeUser((user, cb) =>{
    cb(null, user.id);
})

passport.deserializeUser(async(id,cb) =>{
    let admin = await Admin.findById(id);
    cb(null, admin);
})

passport.checkAuthicate = (req, res, next) =>{
    // console.log(req.isAuthenticated());
    if(req.isAuthenticated()){
        next();
    }else{
        return res.redirect("/")
    }
    
}

passport.setUser = (req, res, next) =>{
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }else{
        res.locals.user = null;
    }
    next();
}

module.exports = passport;