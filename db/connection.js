//use dotenv to hide mysql variables
require("dotenv").config();
const mysql = require("mysql2");

// Connect to database
const db = mysql.createConnection(
  {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: "employees_db",
  },
  console.log(`Connected to the employees_db database.`)
);

// TODO: add validation and handle duplicates better
const addStuff = (type, obj) => {
  switch (type) {
    case "department":
      const sql = `INSERT INTO departments (name) VALUES (?)`;
      const params = [obj];
      db.query(sql, params, (err, result) => {
        if (err) {
          console.log(err);
        }
      });
      break;
  }
};

const getDepartments = () => {
        const sql = "SELECT name FROM departments";
        db.query(sql, (err, result) => {
          if (err) {
            console.log(err);
          }

            let output = [];
            result.forEach(element => output.push(element.name));
          console.log(output);

        });
// return db.query(sql);
}
console.log(getDepartments());
// const departments = db.query(sql, (err, result) => {
//   if (err) {
//     console.log(err);
//   }
//   let output = [];
//   result.forEach((element) => output.push(element.name));
//   console.log(output);
// });
module.exports = { addStuff, getDepartments };
