const mysqldb = require("mysql2");
const con = mysqldb.createConnection({
    host: "localhost",
    user: "root",
    password: "Admin$123",
    database: "dealsdray"
});

function startConnection() {
    con.connect((err) => {
        if (err) throw err;
        console.log("connected");
    });
}

async function getRegister() {
    startConnection();
    const query = `SELECT * FROM t_register`;
    try {
        const [rows] = await con.promise().query(query);
        return rows;
    } catch (err) {
        console.error("Error fetching register data:", err);
    }
}

async function saveRegister(f_userName, f_phoneNumber, f_Email, f_Pwd) {
    startConnection();
    const query = `INSERT INTO t_register(f_userName, f_phoneNumber, f_Email, f_Pwd) VALUES (?, ?, ?, ?)`;
    try {
        await con.promise().query(query, [f_userName, f_phoneNumber, f_Email, f_Pwd]);
        return true;
    } catch (err) {
        console.error("Error saving register data:", err);
    }
}

async function getLogin() {
    startConnection();
    const query = `SELECT * FROM t_login`;
    try {
        const [rows] = await con.promise().query(query);
        return rows;
    } catch (err) {
        console.error("Error fetching login data:", err);
    }
}

async function saveLogin(f_userName, f_Pwd) {
    startConnection();
    const query = `INSERT INTO t_login(f_userName, f_Pwd) VALUES (?, ?)`;
    try {
        await con.promise().query(query, [f_userName, f_Pwd]);
        return true;
    } catch (err) {
        console.error("Error saving login data:", err);
    }
}

async function checkLoggedInUser(f_userName, f_Pwd) {
    startConnection();
    const query = `SELECT f_sno, f_userName, f_phoneNumber, f_Email, f_Pwd FROM t_register WHERE f_userName = ? AND f_Pwd = ?`;
    try {
        const [rows] = await con.promise().query(query, [f_userName, f_Pwd]);
        return rows;
    } catch (err) {
        console.error("Error checking logged in user:", err);
    }
}

async function getEmployee() {
    startConnection();
    const query = `SELECT * FROM t_employee`;
    try {
        const [rows] = await con.promise().query(query);
        return rows;
    } catch (err) {
        console.error("Error fetching employee data:", err);
    }
}

async function saveEmployee(f_Name, f_Email, f_Mobile, f_Designation, f_Gender, f_Course, f_Date, f_Image) {
    startConnection();
    const query = `INSERT INTO t_employee(f_Name, f_Email, f_Mobile, f_Designation, f_Gender, f_Course, f_Date, f_Image) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    try {
        await con.promise().query(query, [f_Name, f_Email, f_Mobile, f_Designation, f_Gender, f_Course, f_Date, f_Image]);
        return true;
    } catch (err) {
        console.error("Error saving employee data:", err);
    }
}

async function getEmployees(){
    startConnection();
    const query=`select * from t_employee`;
    const data=await con.promise().query(query);
    return data[0];
}
async function saveEmployees(f_Name, f_Email, f_Mobile, f_Designation, f_Gender, f_Course, f_Date, f_Image){
    startConnection();
    const query=`INSERT INTO t_employee(f_Name, f_Email, f_Mobile, f_Designation, f_Gender, f_Course, f_Date, f_Image)
    VALUES('${f_Name}','${f_Email}','${f_Mobile}','${f_Designation}','${f_Gender}','${f_Course}','${f_Date}','${f_Image}')`
    await con.promise().query(query);
    return true;
}



module.exports = {
    getRegister,
    saveRegister,
    getLogin,
    saveLogin,
    checkLoggedInUser,
    getEmployee,
    saveEmployee,
    getEmployees:async()=>getEmployees(),
    saveEmployees:async(f_Name, f_Email, f_Mobile, f_Designation, f_Gender, f_Course, f_Date, f_Image)=>saveEmployees(f_Name, f_Email, f_Mobile, f_Designation, f_Gender, f_Course, f_Date, f_Image)
};
