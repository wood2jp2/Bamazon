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

    });
  },

  // supervisorPrompt: function() {
  //   inquirer.prompt([{
  //     name: 'action',
  //     message: 'What would you like to do?',
  //     choices: ['View Product Sales by Department', 'Create New Department'],
  //     type: 'list'
  //   }]).then(function(answers) {
  //     switch (action.answers) {
  //       case 'View Product Sales by Department':
  //
  //       break;
  //     }
  //   });
  // }
};

bamazonSupervisor.createConnection();
