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
  }
  // console.log(`Connected to the employees_db database.`)
);

// TODO: add validation and handle duplicates better
const addStuff = (type, obj) => {
  switch (type) {
    case "department":
      let dsql = `INSERT INTO departments (name) VALUES (?)`;
      const dparams = [obj];
      db.query(dsql, dparams, (err, result) => {
        if (err) {
          console.log(err);
        }
      });
      break;
    case "role":
      let rsql = `INSERT INTO roles (title, salary, department_id) VALUES (?)`;
      const rparams = [obj];
      db.query(rsql, rparams, (err, result) => {
        if (err) {
          console.log(err);
        }
      });
      break;
    case "employee":
      let esql = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?)`;
      if (obj[3] == 0) {
        obj[3] = null;
      }
      const eparams = [obj];
      db.query(esql, eparams, (err, result) => {
        if (err) {
          console.log(err);
        }
      });
      break;
  }
};

const deleteStuff = (type, obj) => {
  switch (type) {
    case "department":
      let dsql = `DELETE FROM departments WHERE id = ?`;
      const dparams = [obj];
      db.query(dsql, dparams, (err, result) => {
        if (err) {
          console.log(err);
        }
      });
      break;
    case "role":
      let rsql = `DELETE FROM roles WHERE id = ?`;
      const rparams = [obj];
      db.query(rsql, rparams, (err, result) => {
        if (err) {
          console.log(err);
        }
      });
      break;
    case "employee":
      let esql = `DELETE FROM employees WHERE id = ?`;
      const eparams = [obj];
      db.query(esql, eparams, (err, result) => {
        if (err) {
          console.log(err);
        }
      });
      break;
  }
};

const updateStuff = (type, obj) => {
  switch (type) {
    case "manager":
      if (obj[0] == 0) {
        obj[0] = null;
      }
      let msql = `UPDATE employees SET manager_id = ${obj[0]} WHERE id = ${obj[1]}`;
      // const mparams = [obj];
      db.query(msql, (err, result) => {
        if (err) {
          console.log(err);
        }
      });
      break;
    case "role":
      let rsql = `UPDATE employees SET role_id = ${obj[0]} WHERE id = ${obj[1]}`;
      const rparams = [obj];
      db.query(rsql, rparams, (err, result) => {
        if (err) {
          console.log(err);
        }
      });
      break;
  }
};
module.exports = { addStuff, deleteStuff, updateStuff };
