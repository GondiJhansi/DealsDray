const express = require("express");
const dbCon = require("./db-con");
const formidable = require("express-formidable");
const cors = require("cors");

const app = express();
app.use(formidable());
app.use(cors());
const port = 5001;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.get("/getapi", (req, res) => createServerCallback(req, res));
function createServerCallback(req, res) {
    res.write("Welcome to express server");
    res.end();
}

app.get("/getregister", async (req, res) => {
    console.log("Register API called");
    try {
        let data = await dbCon.getRegister();
        res.json(data);
    } catch (err) {
        console.error("Error in getregister:", err);
        res.status(500).send("Internal Server Error");
    }
});

app.post("/saveregister", async (req, res) => {
    console.log("Save Register API called");
    try {
        await dbCon.saveRegister(req.fields.f_userName, req.fields.f_phoneNumber, req.fields.f_Email, req.fields.f_Pwd);
        res.send("Register data saved");
    } catch (err) {
        console.error("Error in saveregister:", err);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/getlogin", async (req, res) => {
    console.log("Login API called");
    try {
        let data = await dbCon.getLogin();
        res.json(data);
    } catch (err) {
        console.error("Error in getlogin:", err);
        res.status(500).send("Internal Server Error");
    }
});

app.post("/savelogin", async (req, res) => {
    console.log("Save Login API called");
    try {
        await dbCon.saveLogin(req.fields.f_userName, req.fields.f_Pwd);
        res.send("Login data saved");
    } catch (err) {
        console.error("Error in savelogin:", err);
        res.status(500).send("Internal Server Error");
    }
});

app.post("/checkuser", async (req, res) => {
    console.log("Check User API called");
    try {
        let data = await dbCon.checkLoggedInUser(req.fields.f_userName, req.fields.f_Pwd);
        res.json(data);
    } catch (err) {
        console.error("Error in checkuser:", err);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/getemployee", async (req, res) => {
    console.log("Employee API called");
    try {
        let data = await dbCon.getEmployee();
        res.json(data);
    } catch (err) {
        console.error("Error in getemployee:", err);
        res.status(500).send("Internal Server Error");
    }
});

app.post("/saveemployee", async (req, res) => {
    console.log("Save Employee API called");
    try {
        const { f_Name, f_Email, f_Mobile, f_Designation, f_Gender, f_Course, f_Date } = req.fields;
        const f_Image = req.files.f_Image ? req.files.f_Image.path : null; // Path to the uploaded file
        const fs = require('fs');
        const imageData = fs.readFileSync(f_Image); // Read file data

        await dbCon.saveEmployee(f_Name, f_Email, f_Mobile, f_Designation, f_Gender, f_Course, f_Date, imageData);
        res.send("Employee data saved");
    } catch (err) {
        console.error("Error in saveemployee:", err);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/getemployees",(req,res)=>employeeCallback(req,res));
async function employeeCallback(req,res){
    console.log("Employees API called");
    let data=await dbCon.getEmployees();
    res.write(JSON.stringify(data));
    res.end();
}

app.post("/saveemployees",(req,res)=>saveemployeesCallback(req,res));
async function saveemployeesCallback(req,res){
    console.log("Employees save API called");
    let data=await dbCon.addData(req.fields.f_Name,req.fields.f_Email,req.fields.f_Mobile,req.fields.f_Designation,req.fields.f_Gender,req.fields.f_Course,req.fields.f_Date);
    res.end();
    
}
