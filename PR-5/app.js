const express = require("express");
const dbconnect = require("./config/db.connect");
const path = require("path");

const app = express();

const port = 9090;
app.set("view engine", "ejs");

// Initialize database connection (non-blocking)
dbconnect().then(() => {
    console.log('MovieHub is ready to serve!');
}).catch((error) => {
    console.log('Database connection issues detected, but server continues...');
});

app.use(express.urlencoded({ extended: true }));

app.use("/", require("./routes/index.routes"));

app.use(express.static("public"));

app.use("/uploads",express.static("uploads"));

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
   
})
