const inquirer = require("inquirer");
const mysql = require("mysql2/promise");

require("dotenv").config();

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;
// Connection from db to index.js
async function dbConnection(select) {
  try {
    const db = await mysql.createConnection({
      host: "localhost",
      user: dbUser,
      password: dbPassword,
      database: dbName,
    });

    let rowsFromDb = [];
    let outputFromInq = [];

// Selector for current departments, roles, and employees
// Also for adding new departments, roles, and employees 
    switch (select) {
      case "Show All Departments":
        rowsFromDb = await db.query("SELECT * FROM department");
        console.table(rowsFromDb[0]);
        break;

      case "Show All Roles":
        rowsFromDb = await db.query(`
                SELECT
                    role.id,
                    role.title,
                    role.salary,
                    department.name AS department
                FROM role
                JOIN department ON role.department_id = department.id
                `);
        console.table(rowsFromDb[0]);
        break;

      case "Show All Employees":
        rowsFromDb = await db.query(`
                SELECT
                    employee.id,
                    employee.first_name,
                    employee.last_name,
                    role.title AS title,
                    department.name AS department,
                    role.salary AS salary,
                    CASE WHEN employee.manager_id IS NOT NULL THEN CONCAT(manager_table.first_name,' ', manager_table.last_name) ELSE NULL END AS manager
                FROM employee
                JOIN role ON employee.role_id = role.id
                JOIN department ON role.department_id = department.id
                JOIN employee manager_table ON employee.manager_id = manager_table.id
                `);
        console.table(rowsFromDb[0]);
        break;

      case "Add a Department":
        outputFromInq = await inquirer.prompt([
          {
            name: "department",
            message: "Enter New Department Name:",
          },
        ]);

        try {
          rowsFromDb = await db.query(
            `INSERT INTO department (name) VALUES ('${outputFromInq.department}');`
          );
        } catch (error) {
          console.log("Cannot insert duplicate Department");
        }

        break;

      case "Add a Role":
        outputFromInq = await inquirer.prompt([
          {
            name: "roleName",
            message: "Enter New Role Name:",
          },
          {
            name: "roleSalary",
            message: "Enter New Role Salary:",
          },
          {
            name: "roleDpt",
            message: "Enter New Role Department:",
          },
        ]);

        const { roleName, roleSalary, roleDepartment } = outputFromInq;

        const returnDepartmentId = await db.query(
          `SELECT IFNULL((SELECT id FROM department WHERE name = "${roleDepartment}"), "Department is None Existant")`
        );


        const [rows] = returnDepartmentId;
        const department_id = Object.values(rows[0])[0];

        if (department_id === "Department is None Existant") {
          console.log("Enter a Role in an Existing Department!");
          break;
        }


        rowsFromDb = await db.query(
          ` INSERT INTO role (title, salary, department_id) VALUES ('${roleName}', '${roleSalary}', '${department_id}');`
        );

        break;


      case "Add an Employee":
        outputFromInq = await inquirer.prompt([
          {
            name: "first_name",
            message: "Enter New Employee's First Name:",
          },
          {
            name: "last_name",
            message: "Enter New Employee's Last Name:",
          },
          {
            name: "role",
            message: "Enter New Employee's Role:",
          },
          {
            name: "manager",
            message: "Enter New Employee's Manager:",
          },
        ]);

        const allRoles = await db.query("select * from role;");

        const allManagers = await db.query(
          "select * from employee where manager_id is null;"
        );

        const { first_name, last_name, role, manager } = outputFromInq;

        const role_data = allRoles[0].filter((r) => {
          return r.title === role;
        });

        const manager_data = allManagers[0].filter((m) => {
          return `${m.first_name} ${m.last_name}` === manager;
        });

        rowsFromDb = await db.query(
          `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${first_name}', '${last_name}', ${role_data[0].id}, ${manager_data[0].id})`
        );

        break;

      case "Update an Employee Role":
        currentEmployees = await db.query(`
                SELECT id, first_name, last_name FROM employee;`);

        currentRoles = await db.query(`
                SELECT id, title FROM role;`);

        const employeeList = currentEmployees[0].map((employee) => {
          return {
            name: `${employee["first_name"]} ${employee.last_name}`,
            value: employee.id,
          };
        });

        const roleList = currentRoles[0].map((role) => {
          return {
            name: role.title,
            value: role.id,
          };
        });

        outputFromInq = await inquirer.prompt([
          {
            type: "list",
            name: "employeeId",
            message: "Choose Which Employee to Update:",
            choices: employeeList,
          },
          {
            type: "list",
            name: "newRole",
            message: "Please Enter Employee's New Role:",
            choices: roleList,
          },
        ]);

        console.log(outputFromInq);

        rowsFromDb = await db.query(`
                    UPDATE employee
                    SET role_id = ${outputFromInq.newRole}
                    WHERE employee.id = ${outputFromInq.employeeId};`);

        break;
    }
  } catch (err) {
    console.log(err);
  }
}
// prompt for the selector 
function userPrompt() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "select",
        message: "What would you like to do?",
        choices: [
          "Show All Departments",
          "Show All Roles",
          "Show All Employees",
          "Add a Department",
          "Add a Role",
          "Add an Employee",
          "Update an Employee Role",
          new inquirer.Separator(),
          "Exit",
        ],
      },
    ])
    .then(async (res) => {
      await dbConnection(res.select);
      res.select === "Exit" ? process.exit() : userPrompt();
    })
    .catch((err) => {
      if (error.isTtyError) {
      } else {
        err;
      }
    });
}

userPrompt();