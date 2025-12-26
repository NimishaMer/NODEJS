const mongoose = require("mongoose");

const dbconnect = () => {
    mongoose.connect('mongodb://localhost:27017/BooksmainDB')
      .then(()=>{
        console.log('database is connected');
      })
      .catch((err)=>{
        console.log(err);
      })
}
module.exports  = dbconnect;