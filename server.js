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

connection.connect(function (err) {
  if (err) throw err;
  start();
});

function start() {
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
        "Exit",
      ],
    })
    .then(function (answer) {
      switch (answer.mainMenu) {
        case "View all employees":
          viewEmployees();
          break;
        case "View all employees by department":
          viewEmployeesDept();
          break;
        case "View all employees by manager":
          viewEmployeesManager();
          break;
        case "Add employee":
          addEmployee();
          break;
        case "Add employee":
          addEmployee();
          break;
        case "Add department":
          addDepartment();
          break;
        case "Add role":
          addRole();
          break;
        case "Update employee role":
          updateEmployee();
          break;
        case "Update employee manager":
          udpateEmployeeManager();
          break;
        case "Remove employee":
          removeEmployee();
          break;
        default:
          console.log("Goodbye!");
          connection.end();
          process.exit(0);
          break;
      }
    });
}

function addEmployee() {
  connection.query("Select title, id FROM role", function (errRole, resRole) {
    if (errRole) throw errRole;
    console.log(resRole);
    connection.query(
      `SELECT CONCAT(first_name," ",last_name) AS ManagerName, id FROM employee;`,
      function (errManager, resManager) {
        if (errManager) throw errManager;
        console.log(resManager);

        inquirer
          .prompt([
            {
              name: "employeeFirst",
              type: "input",
              message: "Please enter employee's first name.",
            },
            {
              name: "employeeLast",
              type: "input",
              message: "Please enter employee's last name.",
            },
            {
              name: "employeeRole",
              type: "list",
              message: "Please enter employee's role.",
              choices: resRole.map((role) => {
                return {
                  name: role.title,
                  value: role.id,
                };
              }),
            },
            {
              name: "employeeManager",
              type: "list",
              message: "Please enter employee's manager.",
              choices: resManager.map((manager) => {
                return {
                  name: manager.ManagerName,
                  value: manager.id,
                };
              }),
            },
          ])
          .then(function (answer) {
            connection.query(
              "INSERT INTO employee SET ?",
              {
                first_name: answer.employeeFirst,
                last_name: answer.employeeLast,
                role_id: answer.employeeRole,
                manager_id: answer.employeeManager,
              },
              function (err) {
                if (err) throw err;
                console.log("New employee added!");
                start();
              }
            );
          });
      }
    );
  });
}

function viewEmployees() {
  connection.query(
    `SELECT employee.id, employee.first_name AS "First Name", employee.last_name AS "Last Name", role.title, role.salary, department.name AS "Department", CONCAT(manager.first_name," ",manager.last_name) AS "Manager"
    FROM employee
    INNER JOIN role
    ON employee.role_id = role.id
    INNER JOIN department
    ON role.department_id = department.id
    LEFT JOIN employee manager
    ON manager.id = employee.manager_id;`,
    function (err, res) {
      console.table(res);
      start();
    }
  );
}

function viewEmployeesDept() {
  connection.query(
    // `SELECT employee.id, employee.first_name AS "First Name", employee.last_name AS "Last Name", role.title, role.salary, department.name AS "Department", CONCAT(manager.first_name," ",manager.last_name) AS "Manager"
    // FROM employee
    // INNER JOIN role
    // ON employee.role_id = role.id
    // INNER JOIN department
    // ON role.department_id = department.id
    // LEFT JOIN employee manager
    // ON manager.id = employee.manager_id;`,
    function (err, res) {
      console.table(res);
      start();
    }
  );
}

function viewEmployeesManager() {
  connection.query(
    // `SELECT employee.id, employee.first_name AS "First Name", employee.last_name AS "Last Name", role.title, role.salary, department.name AS "Department", CONCAT(manager.first_name," ",manager.last_name) AS "Manager"
    // FROM employee
    // INNER JOIN role
    // ON employee.role_id = role.id
    // INNER JOIN department
    // ON role.department_id = department.id
    // LEFT JOIN employee manager
    // ON manager.id = employee.manager_id;`,
    function (err, res) {
      console.table(res);
      start();
    }
  );
}

function removeEmployee() {
  connection.query(
    `SELECT CONCAT(first_name," ",last_name) AS EmployeeName, id FROM employee;`,
    function (err, res) {
      if (err) throw err;
      console.log(res);
      inquirer
        .prompt([
          {
            name: "employeeRemove",
            type: "list",
            message: "Please select which employee to remove.",
            choices: res.map((employee) => {
              return {
                name: employee.EmployeeName,
                value: employee.id,
              };
            }),
          },
        ])
        .then(function (answer) {
          connection.query(
            "DELETE FROM employee WHERE id = ?",
            [answer.employeeRemove],
            function (err) {
              if (err) throw err;
              console.log("Employee removed!");
              start();
            }
          );
        });
    }
  );
}
