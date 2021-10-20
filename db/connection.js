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

let output = [];
const getDepartments = () => {
  const sql = "SELECT name FROM departments";
  // let something = await db.promise().query(sql);
  // let arr1 = [];
  // something[0].forEach((element) => arr1.push(element.name));

  // // console.log(arr1);
  // return arr1;
return db.promise().query(sql);

        // db.query(sql, (err, result) => {
        //   if (err) {
        //     console.log(err);
        //   }

        //     let output = [];
        //     result.forEach(element => output.push(element.name));
        //   console.log(output);

        // });
// return db.query(sql);
}
// console.log(getDepartments());
const getADepartment = () => {
  getDepartments().then((res) => {
    // console.log(res);
  });
};
console.log(getADepartment());
// console.log(getDepartments());
// const output = getDepartments().then((res) => {
//   // let arr1 = [];
//   //     res[0].forEach(element => arr1.push(element.name));

//   // // console.log(res[0]);
//   // return arr1;
// });
  //  console.log(output);
// const departments = db.query(sql, (err, result) => {
//   if (err) {
//     console.log(err);
//   }
//   let output = [];
//   result.forEach((element) => output.push(element.name));
//   console.log(output);
// });
module.exports = { addStuff, getDepartments };
