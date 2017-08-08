// node modules
const mysql = require('mysql');
const inquirer = require('inquirer');

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
    inquirer.prompt([{
      name: 'action',
      message: 'What would you like to do?',
      type: 'list',
      choices: ['View Product Sales by Department', 'Create New Department']
    }]).then(function(answers) {
      console.log('asdf');
      switch (answers.action) {
        case 'View Product Sales by Department':
          connection.query("SELECT departments.department_id, departments.department_name, departments.over_head_costs, products.product_sales, SUM(products.product_sales - departments.over_head_costs) AS total_profit FROM products LEFT JOIN departments ON departments.department_name=products.department_name GROUP BY departments.department_id, departments.department_name, departments.over_head_costs, products.product_sales", function(err, res) {
            if (err) throw (err);
            for (let i = 0; i < res.length; i++) {
              console.log(res[i]);
            };
          });
          break;
      }
    });
  }
};

bamazonSupervisor.createConnection();
