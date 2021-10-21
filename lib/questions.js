const { getDepartments } = require("../db/connection");

const firstQuestions = [
  {
    type: "list",
    message: "What would you like to do?",
    name: "choose",
    choices: [
      "Add A Department",
      "Add A Role",
      "Add An Employee",
      "Delete A Department",
      "Delete A Role",
      "Delete An Employee",
      "Update An Employee Manager",
      "Update An Employee Role",
      "View All Departments",
      "View All Employees",
      "View All Roles",
      "View Department Total Utilized Budget",
      "View Employees By Department",
      "Exit",
    ],
  },
];

const addDepartmentQuestion = [
  {
    type: "input",
    message: "Department name?",
    name: "departmentName",
  },
];

module.exports = { firstQuestions, addDepartmentQuestion };
