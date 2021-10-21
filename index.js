const inquirer = require("inquirer");
const { addStuff, deleteStuff, updateStuff } = require("./db/connection");
const { firstQuestions, addDepartmentQuestion } = require("./lib/questions");
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
const firstPrompt = () => {
  inquirer.prompt(firstQuestions).then((answer) => {
    console.log(answer.choose);
    switch (answer.choose) {
      case "Add A Department":
        addA("department");
        break;
      case "Add A Role":
        addA("role");
        break;
      case "Add An Employee":
        addA("employee");
        break;
      case "Delete A Department":
        deleteA("department");
        break;
      case "Delete A Role":
        deleteA("role");
        break;
      case "Delete An Employee":
        deleteA("employee");
        break;
      case "Update An Employee Manager":
        updateA("manager");
        break;
      case "Update An Employee Role":
        updateA("role");
        break;
      case "View All Departments":
        viewAll("department");
        break;
      case "View All Employees":
        viewAll("employee");
        break;
      case "View All Roles":
        viewAll("role");
        break;
      case "View Department Total Utilized Budget":
        view("budget");
        break;
      case "View Employees By Department":
        view("employees");
        break;
      case "Exit":
        process.exit();
        break;
    }
  });
};

const addA = (type) => {
  switch (type) {
    case "department":
      inquirer.prompt(addDepartmentQuestion).then((answer) => {
        addStuff("department", answer.departmentName);
        console.log(
          `The ${answer.departmentName} department has been created.`
        );
        firstPrompt();
      });
      break;
    case "role":
      const rsql = "SELECT id, name FROM departments";
      db.query(rsql, (err, result) => {
        if (err) {
          console.log(err);
        }
        let output = [];
        result.forEach((element) =>
          output.push(`${element.id}: ${element.name}`)
        );
        inquirer
          .prompt([
            {
              type: "input",
              message: "Role title?",
              name: "roleTitle",
            },
            {
              type: "input",
              message: "Role salary?",
              name: "roleSalary",
            },
            {
              type: "list",
              message: "Choose department:",
              name: "roleDepartment",
              choices: output,
            },
          ])
          .then((answer) => {
            let role_dept = answer.roleDepartment.substring(
              0,
              answer.roleDepartment.indexOf(":")
            );
            addStuff("role", [answer.roleTitle, answer.roleSalary, role_dept]);
            console.log(`The ${answer.roleTitle} role has been created.`);
            firstPrompt();
          });
      });
      break;
    case "employee":
      const esql =
        "SELECT * FROM employees JOIN roles ON employees.role_id = roles.id";
      db.query(esql, (err, result) => {
        if (err) {
          console.log(err);
        }
        let manager = [`0 - None`];
        result.forEach((element) =>
          manager.push(
            `${element.id}: ${element.first_name} ${element.last_name}`
          )
        );
        let role = [];
        result.forEach((element) =>
          role.push(`${element.id}: ${element.title}`)
        );
        inquirer
          .prompt([
            {
              type: "input",
              message: "First name?",
              name: "firstName",
            },
            {
              type: "input",
              message: "Last name?",
              name: "lastName",
            },
            {
              type: "list",
              message: "Choose role:",
              name: "employeeRole",
              choices: role,
            },
            {
              type: "list",
              message: "Choose manager:",
              name: "roleManager",
              choices: manager,
            },
          ])
          .then((answer) => {
            let emp_role = answer.employeeRole.substring(
              0,
              answer.employeeRole.indexOf(":")
            );
            let role_man = answer.roleManager.substring(
              0,
              answer.roleManager.indexOf(":")
            );
            addStuff("employee", [
              answer.firstName,
              answer.lastName,
              emp_role,
              role_man,
            ]);
            console.log(
              `The employee ${answer.firstName} ${answer.lastName} has been added.`
            );
            firstPrompt();
          });
      });
      break;
  }
};
const deleteA = (type) => {
  switch (type) {
    case "department":
      const dsql = "SELECT id, name FROM departments";
      db.query(dsql, (err, result) => {
        if (err) {
          console.log(err);
        }
        let output = [];
        result.forEach((element) =>
          output.push(`${element.id}: ${element.name}`)
        );
        inquirer
          .prompt([
            {
              type: "list",
              message: "Choose department:",
              name: "deleteDepartment",
              choices: output,
            },
          ])
          .then((answer) => {
            let dept_id = answer.deleteDepartment.substring(
              0,
              answer.deleteDepartment.indexOf(":")
            );
            deleteStuff("department", [dept_id]);
            console.log(
              `The ${answer.deleteDepartment} department has been deleted.`
            );
            firstPrompt();
          });
      });
      break;
    case "role":
      const rsql = "SELECT id, title FROM roles";
      db.query(rsql, (err, result) => {
        if (err) {
          console.log(err);
        }
        let output = [];
        result.forEach((element) =>
          output.push(`${element.id}: ${element.title}`)
        );
        inquirer
          .prompt([
            {
              type: "list",
              message: "Choose department:",
              name: "deleteRole",
              choices: output,
            },
          ])
          .then((answer) => {
            let role_id = answer.deleteRole.substring(
              0,
              answer.deleteRole.indexOf(":")
            );
            deleteStuff("role", [role_id]);
            console.log(`The ${answer.deleteRole} role has been deleted.`);
            firstPrompt();
          });
      });
      break;
    case "employee":
      const esql = "SELECT * FROM employees";
      db.query(esql, (err, result) => {
        if (err) {
          console.log(err);
        }
        let employees = [];
        result.forEach((element) =>
          employees.push(
            `${element.id}: ${element.first_name} ${element.last_name}`
          )
        );
        inquirer
          .prompt([
            {
              type: "list",
              message: "Choose employee:",
              name: "deleteEmployee",
              choices: employees,
            },
          ])
          .then((answer) => {
            let emp_id = answer.deleteEmployee.substring(
              0,
              answer.deleteEmployee.indexOf(":")
            );
            deleteStuff("employee", [
              answer.deleteEmployee.substring(
                0,
                answer.deleteEmployee.indexOf(":")
              ),
            ]);
            console.log(
              `The employee ${answer.deleteEmployee} has been deleted.`
            );
            firstPrompt();
          });
      });
      break;
  }
};

const updateA = (type) => {
  switch (type) {
    case "manager":
      const esql =
        "SELECT * FROM employees JOIN roles ON employees.role_id = roles.id";
      db.query(esql, (err, result) => {
        if (err) {
          console.log(err);
        }
        let employee = [`0 - None`];
        result.forEach((element) =>
          employee.push(
            `${element.id}: ${element.first_name} ${element.last_name}`
          )
        );
        inquirer
          .prompt([
            {
              type: "list",
              message: "Choose employee:",
              name: "chosenEmployee",
              choices: employee,
            },
            {
              type: "list",
              message: "Choose manager:",
              name: "chosenManager",
              choices: employee,
            },
          ])
          .then((answer) => {
            let chosen_employee = answer.chosenEmployee.substring(
              0,
              answer.chosenEmployee.indexOf(":")
            );
            let chosen_manager = answer.chosenManager.substring(
              0,
              answer.chosenManager.indexOf(":")
            );
            updateStuff("manager", [
              chosen_manager,
              chosen_employee,
            ]);
            console.log(
              `${answer.chosenEmployee}'s new manager is ${answer.chosenManager}.`
            );
            firstPrompt();
          });
      });
      break;
    case "role":
      const rsql = "SELECT id, title FROM roles";
      db.query(rsql, (err, result) => {
        if (err) {
          console.log(err);
        }
        let output = [];
        result.forEach((element) =>
          output.push(`${element.id}: ${element.title}`)
        );
        inquirer
          .prompt([
            {
              type: "list",
              message: "Choose department:",
              name: "deleteRole",
              choices: output,
            },
          ])
          .then((answer) => {
            let role_id = answer.deleteRole.substring(
              0,
              answer.deleteRole.indexOf(":")
            );
            deleteStuff("role", [role_id]);
            console.log(`The ${answer.deleteRole} role has been deleted.`);
            firstPrompt();
          });
      });
      break;
  }
};
firstPrompt();
// Create an employee
// app.post("/api/new-movie", ({ body }, res) => {
//   const sql = `INSERT INTO movies (movie_name)
//     VALUES (?)`;
//   const params = [body.movie_name];

//   db.query(sql, params, (err, result) => {
//     if (err) {
//       res.status(400).json({ error: err.message });
//       return;
//     }
//     res.json({
//       message: "success",
//       data: body,
//     });
//   });
// });

// // Read all movies
// app.get("/api/movies", (req, res) => {
//   const sql = `SELECT id, movie_name AS title FROM movies`;

//   db.query(sql, (err, rows) => {
//     if (err) {
//       res.status(500).json({ error: err.message });
//       return;
//     }
//     res.json({
//       message: "success",
//       data: rows,
//     });
//   });
// });

// // Delete a movie
// app.delete("/api/movie/:id", (req, res) => {
//   const sql = `DELETE FROM movies WHERE id = ?`;
//   const params = [req.params.id];

//   db.query(sql, params, (err, result) => {
//     if (err) {
//       res.statusMessage(400).json({ error: res.message });
//     } else if (!result.affectedRows) {
//       res.json({
//         message: "Movie not found",
//       });
//     } else {
//       res.json({
//         message: "deleted",
//         changes: result.affectedRows,
//         id: req.params.id,
//       });
//     }
//   });
// });

// // Read list of all reviews and associated movie name using LEFT JOIN
// app.get("/api/movie-reviews", (req, res) => {
//   const sql = `SELECT movies.movie_name AS movie, reviews.review FROM reviews LEFT JOIN movies ON reviews.movie_id = movies.id ORDER BY movies.movie_name;`;
//   db.query(sql, (err, rows) => {
//     if (err) {
//       res.status(500).json({ error: err.message });
//       return;
//     }
//     res.json({
//       message: "success",
//       data: rows,
//     });
//   });
// });

// // Update review name
// app.put("/api/review/:id", (req, res) => {
//   const sql = `UPDATE reviews SET review = ? WHERE id = ?`;
//   const params = [req.body.review, req.params.id];

//   db.query(sql, params, (err, result) => {
//     if (err) {
//       res.status(400).json({ error: err.message });
//     } else if (!result.affectedRows) {
//       res.json({
//         message: "Movie not found",
//       });
//     } else {
//       res.json({
//         message: "success",
//         data: req.body,
//         changes: result.affectedRows,
//       });
//     }
//   });
// });

// // Default response for any other request (Not Found)
// app.use((req, res) => {
//   res.status(404).end();
// });

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
