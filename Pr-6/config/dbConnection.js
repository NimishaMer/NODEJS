const mongoose = require("mongoose");

const dbConnect = () => {
    mongoose.connect("mongodb+srv://mernimisha:mernimishasureshbhai@cluster0.c5dburn.mongodb.net/blogApp")
        .then(() => console.log('DB is Conected!!!'))
        .catch((err) => console.log(err));
}
module.exports = dbConnect;