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

// each table has own class
// use classes for crud
// use classes for joins

//async await...







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
          "Add department",
          "Add role",
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
        else if (answer.mainMenu === "Add department") {
            addDepartment();
        }
        else if (answer.mainMenu === "Add role") {
            addRole();
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

function addEmployee() {
    inquirer
      .prompt([
        {
          name: "employeeFirst",
          type: "input",
          message: "Please enter employee's first name."
        },
        {
            name: "employeeLast",
            type: "input",
            message: "Please enter employee's last name."
        },
        {
            name: "employeeRole",
            type: "list",
            message: "Please enter employee's role.",
            choices: [
                
                 ]
        },
        {
            name: "employeeManager",
            type: "list",
            message: "Please enter employee's manager.",
            choices: [
                
                 ]
        }
      ])
      .then(function(answer) {
        connection.query(
          "INSERT INTO employee SET ?",
          {
            first_name: answer.employeeFirst,
            last_name: answer.employeeLast,
            role_id: an,
            manager_id: fdasfd
          },
          function(err) {
            if (err) throw err;
            console.log("New employee added!");
            start();
          }
        );
      });
  }
  function removeEmployee() {
    inquirer
      .prompt([
            {
            name: "employeeRemove",
            type: "list",
            message: "Please select which employee to remove.",
            choices: [
                
                 ]
        }
      ])
      .then(function(answer) {
        connection.query(
          "DELETE FROM employee WHERE id = ?",
          {
            
          },
          function(err) {
            if (err) throw err;
            console.log("Employee removed!");
            start();
          }
        );
      });
  }