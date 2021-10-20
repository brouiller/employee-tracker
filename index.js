const inquirer = require("inquirer");
const { addStuff } = require("./db/connection");
const { firstQuestions, addDepartmentQuestion } = require("./lib/questions");

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
      inquirer.prompt(addDepartmentQuestion).then((answer) => {
        addStuff("department", answer.departmentName);
        console.log(
          `The ${answer.departmentName} department has been created.`
        );
        firstPrompt();
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
