const mongoose = require('mongoose');

const dbConnect = () =>{
    mongoose.connect("mongodb+srv://mernimisha:mernimishasureshbhai@cluster0.c5dburn.mongodb.net/admin-API")
    .then(() => console.log('DB Connected'))
    .catch(err => console.log(err))
}

module.exports = dbConnect;