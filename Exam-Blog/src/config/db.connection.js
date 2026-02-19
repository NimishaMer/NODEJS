const mongoose = require('mongoose')

const dbconnect = () => {
     mongoose.connect("mongodb+srv://mernimisha:mernimishasureshbhai@cluster0.c5dburn.mongodb.net/blog")
        .then(() => console.log('DB is Connected !!!'))
        .catch((err) => console.log(err))
}

module.exports = dbconnect;