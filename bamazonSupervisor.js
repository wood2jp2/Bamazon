// node modules
const mysql = require('mysql');
const inquirer = require('inquirer');
const consoleTable = require('console.table');

// database connection
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'root',
  database: 'bamazon_DB',
  port: 3306
});

// object and methods for customer, for readability
var bamazonSupervisor = {

  // create connection to database using connect method
  createConnection: function() {
    connection.connect(function(err) {
      if (err) throw (err);
      console.log('Connected to bamazon_DB!');
      bamazonSupervisor.supervisorPrompt();
    });
  },

  supervisorPrompt: function() {

    // questions and options
    inquirer.prompt([{
      name: 'action',
      message: 'What would you like to do?',
      type: 'list',
      choices: ['View Product Sales by Department', 'Create New Department']
    }]).then(function(answers) {

      // i <3 switch statements
      switch (answers.action) {
        case 'View Product Sales by Department':

          // took me a while to figure out this query lol
          connection.query("SELECT departments.department_id, departments.department_name, departments.over_head_costs, products.product_sales, SUM(products.product_sales - departments.over_head_costs) AS total_profit FROM products LEFT JOIN departments ON departments.department_name=products.department_name GROUP BY departments.department_id, departments.department_name, departments.over_head_costs, products.product_sales", function(err, res) {
            if (err) throw (err);
            console.table(res);
          });
          break;

        case 'Create New Department':
          inquirer.prompt([{
            name: 'newDeptName',
            message: 'Please enter the new department name.',
          }, {
            name: 'newDeptOverhead',
            message: 'Please enter the overhead costs for this department.'
          }]).then(function(answers) {
            var newDeptName = answers.newDeptName;
            var newOverhead = parseInt(answers.newDeptOverhead);

            // if there's one thing I can do with mySQL, it's insert new values into the DB
            connection.query(`INSERT INTO departments (department_name, over_head_costs) VALUES ('${newDeptName}', ${newOverhead})`, function(err, res) {
              console.log('Department has been added!');
            });
          });
          break;
      };
    });
  }
};

bamazonSupervisor.createConnection();
