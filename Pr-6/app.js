const express = require('express');
const port = 9988;
const app = express();
const dbConnect = require("./config/dbConnection");

// database connection
dbConnect();

// middlewares
app.set("view engine", 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

// routes
app.use("/", require("./routes/index.routes"));

app.listen(port, () => {
    console.log(`Server Start at http://localhost:${port}/dashBoard`);
});
