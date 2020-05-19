const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");
require("dotenv").config();

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

connection.connect(function(err) {
    if (err) throw err;
    start();
  });

function start () {
    inquirer
    .prompt({
      name: "mainMenu",
      type: "list",
      message: "Would you like to do?",
      choices: [
          "View all employees",
          "View all employees by department",
          "View all employees by manager",
          "Add employee",
          "Remove employee",
          "Update employee role",
          "Update employee manager",
          "Exit"
           ]
    })
    .then(function(answer) {
        if (answer.mainMenu === "View all employees") {
            viewEmployees();
        }
        else if (answer.mainMenu === "View all employees by department") {
            viewEmployeesDept();
        }
        else if (answer.mainMenu === "View all employees by manager") {
            viewEmployeesManager();
        }
        else if (answer.mainMenu === "Add employee") {
            addEmployee();
        }
        else if (answer.mainMenu === "Remove employee") {
            removeEmployee();
        }
        else if (answer.mainMenu === "Update employee role") {
            updateEmployee();
        }
        else if (answer.mainMenu === "Update employee manager") {
            udpateEmployeeManager();
        } else {
            connection.end();
        }
    })
}