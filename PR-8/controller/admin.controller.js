const Admin = require('../model/admin.model');
const bcrypt = require("bcrypt");
const path = require('path');
const fs = require('fs');

exports.addAdminPage = async (req, res) => {
    try {
        return res.render("admin/addAdmin")
    } catch (error) {
        console.log(error);
        return res.redirect("/dashboard");
    }
}

exports.viewAdmin = async (req, res) => {
    try {
        let admins = await Admin.find();
        return res.render("admin/viewAdmin", { admins })
    } catch (error) {
        console.log(error);
        return res.redirect("/dashboard");
    }
}

exports.addadmin = async (req, res) => {
    try {
        let imagePath = "";
        if (req.file) {
            imagePath = `/uploads/${req.file.filename}`;
        }

        let hashPassword = await bcrypt.hash(req.body.password, 10)

        let newAdmin = await Admin.create({
            ...req.body,
            password: hashPassword,
            adminImage: imagePath
        });

        req.flash('success', 'Add Admin Success');
        return res.redirect("/admin/add-admin")
    } catch (error) {
        console.log(error);
        return res.redirect("/dashboard");
    }
}

exports.deleteAdmin = async (req, res) => {
    try {
        let admin = await Admin.findById(req.params.id);

        if (admin.adminImage != '') {
            let filepath = path.join(__dirname, '..', admin.adminImage);
            try {
                await fs.unlinkSync(filepath)
            } catch (error) {
                console.log('Admin Not Found!');
            }
        }
        await Admin.findByIdAndDelete(req.params.id);
        req.flash('success', 'Datate Admin Success');
        return res.redirect("/admin/view-admin")
    } catch (error) {
        req.flash('error', 'Admin Not Dalate!!');
        return res.redirect("/dashboard");
    }
}

exports.editAdminPage = async (req, res) => {
    try {
        let admin = await Admin.findById(req.params.id);
        req.flash('success', 'Edit Admin Success');
        return res.render("admin/editAdmin", { admin })
    } catch (error) {
        req.flash('error', 'Admin Not Edit!');
        console.log(error);
        return res.redirect("/dashboard");
    }
}

exports.singleView = async (req, res) => {
    try {
        let admin = await Admin.findById(req.params.id);
        return res.render("admin/singleView", { admin })
    } catch (error) {
        console.log(error);
        return res.redirect("/dashboard");
    }
}

exports.updateAdmin = async (req, res) => {
    try {
        let admin = await Admin.findById(req.params.id);

        if (!admin) {
            console.log('Admin Not Found !');
            return res.redirect("/dashboard");
        }

        let filepath = admin.adminImage;

        if (req.file) {
            if (admin.adminImage != '') {
                let oldpath = path.join(__dirname, '..', admin.adminImage);
                try {
                    await fs.unlinkSync(oldpath);
                } catch (error) {
                    console.log('old file is missing');
                }
            }
            filepath = `/uploads/${req.file.filename}`;
        }
        await Admin.findByIdAndUpdate(req.params.id, {
            ...req.body,
            adminImage: filepath
        }, { new: true })

        req.flash('success', 'Update Admin Success');
        return res.redirect("/admin/view-admin")

    } catch (error) {
        console.log(error);
        return res.redirect("/dashboard");
    }
}