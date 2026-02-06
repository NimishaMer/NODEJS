const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
    fname: {
        type: String
    },
    lname: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    number: {
        type: Number
    },
    role: {
        type: String
    },
    Join_date: {
        type: Date
    },
    adminImage: {
        type: String
    }
});

module.exports = mongoose.model('admins', adminSchema);