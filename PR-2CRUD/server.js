const express = require('express');
const port = 9009;
const server = express();
server.use(express.static("public"));


server.use(express.urlencoded());
let student = [
    { "id": "101", "first_name": "Aarav", "last_name": "Patel", "Email": "aarav.patel@webdev.com", "phone": "9812345670", "gender": "Male", "department": "Computer Science", "semester": "7", "course": "Full Stack Development" },
    { "id": "102", "first_name": "Priya", "last_name": "Sharma", "Email": "priya.sharma@webdev.com", "phone": "9723456781", "gender": "Female", "department": "IT", "semester": "5", "course": "Frontend Development" },
    { "id": "103", "first_name": "Karan", "last_name": "Singh", "Email": "karan.singh@webdev.com", "phone": "9634567892", "gender": "Male", "department": "Electronics", "semester": "3", "course": "Embedded Systems" },
    { "id": "104", "first_name": "Nisha", "last_name": "Verma", "Email": "nisha.verma@webdev.com", "phone": "9545678903", "gender": "Female", "department": "Mechanical", "semester": "8", "course": "CAD Design" },
    { "id": "105", "first_name": "Rohan", "last_name": "Joshi", "Email": "rohan.joshi@webdev.com", "phone": "9456789014", "gender": "Male", "department": "Management", "semester": "1", "course": "Business Analytics" },
    { "id": "106", "first_name": "Meera", "last_name": "Desai", "Email": "meera.desai@webdev.com", "phone": "9367890125", "gender": "Female", "department": "Computer Science", "semester": "4", "course": "UI/UX Design" },
    { "id": "107", "first_name": "Vivek", "last_name": "Goyal", "Email": "vivek.goyal@webdev.com", "phone": "9278901236", "gender": "Male", "department": "IT", "semester": "6", "course": "Backend Development" }
]




server.set("view engine", 'ejs');




server.get("/", (req, res) => {
    res.render("index", { student })
});


server.post("/add-student", (req, res) => {
    console.log("Body:", req.body)
    student.push(req.body);
    return res.redirect("/");
});

//Edit 

server.get("/edit-student/:id", (req, res) => {
    // console.log(req.query);
    let record = student.find(stu => stu.id == req.params.id);
    console.log(record);
    return res.render("edit-student", { student: record });
});


//Delet
server.get("/delet-student/:id", (req, res) => {
    // console.log(req.params);
    let id = req.params.id;
    student = student.filter(stu => stu.id != id)
    return res.redirect("/")
});

//update
server.post("/update-student", (req, res) => {
    const studentID = req.query.studentID;
    console.log(req.query);

    let updateData = student.map(stu => {
        if (stu.id == studentID) {
            return {
                ...stu,
                ...req.body,
                id: studentID
            }
        } else {
            return stu;
        }


    });
    student = updateData;
    return res.redirect("/");
});


server.listen(port, () => {
    console.log(`Server start at http://localhost:${port}`);

});