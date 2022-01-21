const mysql = require("mysql2");
const inquirer = require("inquirer");
const cTable = require("console.table");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "vandy2803",
  database: "employee_db",
});

connection.connect(function(err) {
    if (err) throw err;
    promptUser();
    console.log("Connected!");
    connection.query("SELECT * FROM employee", function(err, res) {
        showemployees = res.map(employee => ({ name: `${employee.first_name} ${employee.last_name}`, value: employee.id}))
    })
    connection.query('SELECT * FROM role', function(err, res) {
        showroles = res.map(role => ({ name: role.title, value: role.id }))
    })
})


// View all departments
const promptUser = () => {
    return inquirer.prompt([
        {
            type: "list",
            name: "options",
            message: "What would you like to do?",
            choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role', 'Finish']
        }
    ])
    .then(async ({ options }) => {
        switch (options) {
            case 'View All Departments':
                await viewDepartments();
                break;
            case 'View All Roles':
                viewRoles();
                return;
            case 'View All Employees':
                viewEmployees();
                return;
            case 'Add a Department':
                addDepartment();
                return;
            case 'Add a Role':
                addRole();
                return;
            case 'Add an Employee':
                addEmployee();
                return;
            case 'Update an Employee Role':
                updateEmployee();
                return; 
            case 'Finish':
               connection.end();
               return;                
        }
    }) 
};

function viewDepartments() {
     connection.query(
        `SELECT * FROM department`,
        function(err, results) {
            console.table(results);

            if (err) throw err;
        }
    )

    promptUser();
}

function viewRoles() {
    connection.query(
        `SELECT * FROM role`,
        function(err, results) {
            console.table(results);

            if (err) throw err;
        }
    )

    promptUser();
}

function viewEmployees() {
    connection.query(
        `SELECT * FROM employee`,
        function(err, results) {
            console.table(results);

            if (err) throw err;
        }
    )

    promptUser();
}

function addDepartment() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the name of the new department?",
            name: "name"
        }
    ]).then(function (response) {
        addNewDepartment(response)
    })
}

function addNewDepartment(data) {
    connection.query("INSERT INTO department SET ?", {name: data.name },
    function (err, res) {
        if (err) throw err;
        console.log(res);
        viewDepartments();
    }); 
}

function addRole() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is name of new role?",
            name: "newRoleName"
        },
        {
            type: "input",
            message: "What is salary of new role?",
            name: "newRoleSalary"
        },
        {
            type: "list",
            message: "What is the department id for this role??",
            choices: [1, 2, 3, 4],
            name: "departmentName"
        }
    ]).then (function (response) {
        addNewRole(response)
    })
}

function addNewRole(data) {
    connection.query("INSERT INTO role SET ?", {title: data.newRoleName, salary: data.newRoleSalary, department_id: data.departmentName  },
    function (err, res) {
        if (err) throw err;
        console.log(res);
        viewRoles();
    });
}


function addEmployee() {
    inquirer.prompt([
        {
            type: "input",
            name: "firstName",
            message: "What is employee's first name?"
    },
    {
        type: "input",
        message: "What is employee's last name?",
        name: "lastName"
    },
    {
        type: "input",
        message: "What is employee's role id?",
        name: "roleId"
    },
    {
        type: "input",
        message: "What is employee's manager id?",
        name: "managerId"
    }
    ]).then(function (response) {
        addNewEmployee(response)
    })
}

function addNewEmployee(data) {
    connection.query("INSERT INTO employee SET ?", { first_name: data.firstName, last_name: data.lastName, role_id: data.roleId, manager_id: data.managerId },
    function (err, res) {
        if (err) throw err;
        console.log(res);
        viewEmployees();
    })
}

function updateEmployee() {
    inquirer.prompt([
        {
            type: "list",
            message: "Which employee would you like to update?",
            name: "updEmployee",
            choices: showemployees
        },
        {
            type: "list",
            message: "What is employee's new role?",
            name: "updRole",
            choices: showroles
        }
    ]) .then(function (response) {
        updateEmployeeRole(response)
    })
}

function updateEmployeeRole(data) {
    connection.query(`UPDATE employees SET role_id = ${data.updRole} WHERE id = ${data.updEmployee}`),
    function(err, res) {
        if (err) throw err;
        console.log(res);
        
    }
   viewEmployees(); 
}