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
      message: "Welcome! What would you like to do?",
      choices: [
        "View all employees",
        "View all employees by department",
        "View all employees by manager",
        "View all roles",
        "View all departments",
        "Add employee",
        "Add department",
        "Add role",
        "Update employee role",
        "Update employee manager",
        "Remove employee",
        // "Remove role",
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
        case "View all roles":
          viewRoles();
          break;
        case "View all departments":
          viewDepartments();
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
          updateEmployeeRole();
          break;
        case "Update employee manager":
          udpateEmployeeManager();
          break;
        case "Remove employee":
          removeEmployee();
          break;
        // case "Remove role":
        //   removeRole();
        //   break;
        default:
          console.log("Goodbye!");
          connection.end();
          process.exit(0);
          break;
      }
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
    `SELECT department.name AS "Department", CONCAT(employee.first_name," ",employee.last_name) AS "Employee", role.title, role.salary, CONCAT(manager.first_name," ",manager.last_name) AS "Manager"
        FROM employee
        INNER JOIN role
        ON employee.role_id = role.id
        INNER JOIN department
        ON role.department_id = department.id
        LEFT JOIN employee manager
        ON manager.id = employee.manager_id
        ORDER BY Department;`,
    function (err, res) {
      console.table(res);
      start();
    }
  );
}

function viewEmployeesManager() {
  connection.query(
    `SELECT CONCAT(manager.first_name," ",manager.last_name) AS "Manager", CONCAT(employee.first_name," ",employee.last_name) AS "Employee", role.title, role.salary, department.name AS "Department"
      FROM employee
      INNER JOIN role
      ON employee.role_id = role.id
      INNER JOIN department
      ON role.department_id = department.id
      LEFT JOIN employee manager
      ON manager.id = employee.manager_id
      ORDER BY Manager;`,
    function (err, res) {
      console.table(res);
      start();
    }
  );
}

function viewRoles() {
  connection.query(
    `SELECT role.id, role.title, role.salary, department.name AS Department
      FROM role
      LEFT JOIN department
      ON role.department_id = department.id
      ORDER BY Department;`,
    function (err, res) {
      console.table(res);
      start();
    }
  );
}

function viewDepartments() {
  connection.query(`SELECT name AS Department_Name FROM department;`, function (
    err,
    res
  ) {
    console.table(res);
    start();
  });
}

function addEmployee() {
  connection.query("Select title, id FROM role", function (errRole, resRole) {
    if (errRole) throw errRole;
    connection.query(
      `SELECT CONCAT(first_name," ",last_name) AS ManagerName, id FROM employee;`,
      function (errManager, resManager) {
        if (errManager) throw errManager;
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
              message: "Please select employee's role.",
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
              message: "Please select employee's manager.",
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

function addRole() {
  connection.query("Select name, id FROM department", function (
    errDept,
    resDept
  ) {
    if (errDept) throw errDept;
    inquirer
      .prompt([
        {
          name: "newRole",
          type: "input",
          message: "Please enter role title.",
        },
        {
          name: "roleSalary",
          type: "input",
          message: "Please enter role salary.",
        },
        {
          name: "roleDept",
          type: "list",
          message: "Please select the department.",
          choices: resDept.map((department) => {
            return {
              name: department.name,
              value: department.id,
            };
          }),
        },
      ])
      .then(function (answer) {
        connection.query(
          "INSERT INTO role SET ?",
          {
            title: answer.newRole,
            salary: answer.roleSalary,
            department_id: answer.roleDept,
          },
          function (err) {
            if (err) throw err;
            console.log("New role added!");
            start();
          }
        );
      });
  });
}

function addDepartment() {
  inquirer
    .prompt([
      {
        name: "newDepartment",
        type: "input",
        message: "Please enter department name.",
      },
    ])
    .then(function (answer) {
      connection.query(
        "INSERT INTO department SET ?",
        {
          name: answer.newDepartment,
        },
        function (err) {
          if (err) throw err;
          console.log("New Department added!");
          start();
        }
      );
    });
}

function updateEmployeeRole() {
  connection.query(
    `SELECT CONCAT(first_name," ",last_name) AS EmployeeName, id FROM employee;`,
    function (errEmployee, resEmployee) {
      if (errEmployee) throw errEmployee;
      connection.query("Select title, id FROM role", function (
        errRole,
        resRole
      ) {
        if (errRole) throw errRole;
        inquirer
          .prompt([
            {
              name: "employeeName",
              type: "list",
              message: "Please select employee.",
              choices: resEmployee.map((employee) => {
                return {
                  name: employee.EmployeeName,
                  value: employee.id,
                };
              }),
            },
            {
              name: "employeeRole",
              type: "list",
              message: "Please select employee's new role.",
              choices: resRole.map((role) => {
                return {
                  name: role.title,
                  value: role.id,
                };
              }),
            },
          ])
          .then(function (answer) {
            connection.query(
              "UPDATE employee SET role_id = ? WHERE id = ?",
              [answer.employeeRole, answer.employeeName],
              function (err) {
                if (err) throw err;
                console.log("Employee role updated!");
                start();
              }
            );
          });
      });
    }
  );
}

function udpateEmployeeManager() {
  connection.query(
    `SELECT CONCAT(first_name," ",last_name) AS EmployeeName, id FROM employee;`,
    function (errEmployee, resEmployee) {
      if (errEmployee) throw errEmployee;
      connection.query(
        `SELECT CONCAT(first_name," ",last_name) AS ManagerName, id FROM employee;`,
        function (errManager, resManager) {
          if (errManager) throw errManager;
        inquirer
          .prompt([
            {
              name: "employeeName",
              type: "list",
              message: "Please select employee.",
              choices: resEmployee.map((employee) => {
                return {
                  name: employee.EmployeeName,
                  value: employee.id,
                };
              }),
            },
            {
              name: "employeeManager",
              type: "list",
              message: "Please select employee's new manager.",
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
              "UPDATE employee SET manager_id = ? WHERE id = ?",
              [answer.employeeManager, answer.employeeName],
              function (err) {
                if (err) throw err;
                console.log("Employee's manager updated!");
                start();
              }
            );
          });
      });
    }
  );
}

function removeEmployee() {
  connection.query(
    `SELECT CONCAT(first_name," ",last_name) AS EmployeeName, id FROM employee;`,
    function (err, res) {
      if (err) throw err;
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

// function removeRole() {
//   connection.query(`SELECT title, id FROM role;`, function (err, res) {
//     if (err) throw err;
//     inquirer
//       .prompt([
//         {
//           name: "roleRemove",
//           type: "list",
//           message: "Please select which role to remove.",
//           choices: res.map((role) => {
//             return {
//               name: role.title,
//               value: role.id,
//             };
//           }),
//         },
//       ])
//       .then(function (answer) {
//         connection.query(
//           "DELETE FROM role WHERE id = ?",
//           [answer.roleRemove],
//           function (err) {
//             if (err) throw err;
//             console.log("Role removed!");
//             start();
//           }
//         );
//       });
//   });
// }
