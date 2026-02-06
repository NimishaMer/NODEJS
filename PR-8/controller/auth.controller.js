// const BlogUser = require('../model/blog.model');
const Admin = require('../model/admin.model');
const bcrypt = require("bcrypt");

exports.loginpage = async (req, res) => {
    try {
        if (req.isAuthenticated()) {
            return res.redirect('/dashboard');
        } else {
            return res.render("loginpage");
        }
    } catch (error) {
        console.log(error);
        return res.redirect("/");
    }
}
exports.dashboardpage = async (req, res) => {
    try {
        if (req.isAuthenticated()) {

            // req.flash('success', 'Login Success');
            return res.render("dashboard");
        } else {
            return res.render("loginpage");
        }
    } catch (error) {
        console.log(error);
        return res.redirect("/");
    }
}

exports.myprofile = async (req, res) => {
    try {
        if (req.isAuthenticated()) {
            return res.render("myProfile", { admin: req.user });
        } else {
            return res.redirect("/");
        }
    } catch (error) {
        console.log(error);
        return res.redirect("/");
    }
}

exports.changePasswordPage = async (req, res) => {
    try {
        if (req.isAuthenticated()) {
            return res.render("auth/changePassword");
        } else {
            return res.redirect("/");
        }
    } catch (error) {
        console.log(error);
        return res.redirect("/");
    }
}

exports.changePassword = async (req, res) => {
    try {
        const { newPass, oldPass, cPass } = req.body;
        const admin = req.user;
        // console.log(admin)
        let matchPass = await bcrypt.compare(oldPass, admin.password);

        if (!matchPass) {
            req.flash('error', 'Old Password Not match !!');
            // console.log("Old Password Not match !!");
            return res.redirect("/change-password")
        }

        if (newPass == cPass) {
            let hashPassword = await bcrypt.hash(newPass, 10);
            await Admin.findByIdAndUpdate(admin._id, { password: hashPassword }, { new: true });
            req.flash('success', 'Password Update Success');
            return res.redirect("/dashboard");
        } else {
            req.flash('error', 'New & Confirm Password Not match !!');
            // console.log("New & Confirm Password Not match !!");
            return res.redirect("/change-password")
        }

    } catch (error) {
        console.log(error);
        return res.redirect("/");
    }
}


exports.logOutUser = async (req, res) => {
    try {
        req.logout(() => {
            req.session.destroy(() => {
                return res.redirect("/");
            })
        })
    } catch (error) {
        console.log(error);
        return res.redirect("/");
    }
}

exports.loginUser = async (req, res) => {
    try {
        req.flash('success', 'login Success ')
        return res.redirect("/dashboard");
    } catch (error) {
        console.log(error);
        return res.redirect("/");
    }
}