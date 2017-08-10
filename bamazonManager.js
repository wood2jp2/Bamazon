// require node packages
const mysql = require('mysql');
const inquirer = require('inquirer');
const consoleTable = require('console.table');

// set up database connection
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'root',
  database: 'bamazon_DB',
  port: 3306
});

// object for readability
var bamazonManager = {

  // create connection to database using connect method
  createConnection: function() {
    connection.connect(function(err) {
      if (err) throw (err);
      console.log('Connected to bamazon_DB!');
      bamazonManager.displayOptions();
    });
  },

  // options for manager displayed using inquirer
  displayOptions: function() {
    inquirer.prompt([{
      name: 'managerOptions',
      message: 'Please choose an option: ',
      type: 'list',
      choices: ['View Products for Sale', 'View Low Inventory',
        'Add to Inventory', 'Add New Product'
      ]
    }]).then(function(answers) {

      // switch / case statement makes this easier
      switch (answers.managerOptions) {
        case 'View Products for Sale':

          // counts through and grabs all data from products table
          connection.query('SELECT * from products', function(err, res) {
            for (let i = 0; i < res.length; i++) {
              console.log(`${res[i].item_id}. ${res[i].product_name} - Price: $${res[i].price}. Quantity Available: ${res[i].stock_quantity}`)
            }
          });
          break;

        case 'View Low Inventory':

          // counts through and grabs data from table where the stock is less than or equal to 5
          connection.query('SELECT * from products WHERE stock_quantity<=5', function(err, res) {
            for (let i = 0; i < res.length; i++) {
              console.log(`${res[i].item_id}. ${res[i].product_name} - Price: $${res[i].price}. Quantity Available: ${res[i].stock_quantity}`)
            }
          });
          break;

        case 'Add to Inventory':

          // display all products for user reference
          connection.query('SELECT * from products', function(err, res) {
            if (err) throw (err);
            for (let i = 0; i < res.length; i++) {
              console.log(`${res[i].item_id}. ${res[i].product_name} - Quantity: ${res[i].stock_quantity}`)
            };


            inquirer.prompt([{
              name: 'itemToStock',
              message: 'Please enter the ID of the product you\'d like to stock.'
            }, {
              name: 'quantityToAdd',
              message: 'Please enter quantity to add to current stock.'
            }]).then(function(answers) {

              // assign manager answers to variables to manipulate
              var itemID = answers.itemToStock;
              var addQuantity = parseInt(answers.quantityToAdd);

              // grab only the data for product that is being restocked
              connection.query(`SELECT * from products WHERE item_id = ${itemID}`, function(err, res) {
                // restocking quantity and assigns to variable
                var refreshedQuantity = res[0].stock_quantity + addQuantity;
                // ensuring answer is greater than zero
                if (addQuantity > 0) {
                  // updating amount in SQL per manager re-stock
                  connection.query(`UPDATE products SET stock_quantity = ${refreshedQuantity} \
                    WHERE item_id = ${itemID}`, function(err, results) {
                    console.log(`${res[0].product_name}'s QTY updated to ${refreshedQuantity}`);
                  });
                } else {
                  // if answer is negative or NaN
                  console.log('Please enter a number greater than zero!')
                }
              })
            });
          });
          break;
        case 'Add New Product':

          // inquirer makes it easier to grab answers / user input
          inquirer.prompt([{
            name: 'newProductName',
            message: 'What is the name of the product you are adding?'
          }, {
            name: 'newProductDept',
            message: 'What department does this belong to?'
          }, {
            name: 'newProductPrice',
            message: 'How much will you be selling this for?'
          }, {
            name: 'newProductQty',
            message: 'How many will you initially stock?'
          }]).then(function(answers) {

            // assign
            var newName = answers.newProductName;
            var newDept = answers.newProductDept;
            var newPrice = answers.newProductPrice;
            var newQty = answers.newProductQty;

            // adding to table
            connection.query(`INSERT INTO products (product_name, department_name, price, stock_quantity) \
                              VALUES ('${newName}', '${newDept}', '${newPrice}', '${newQty}')`,
              function(err, res) {
                if (err) throw (err);
                console.log('Product added!');
              });
          });
          break;
        default:
          console.log('Please make a selection.');
      }
    });
  },
};

bamazonManager.createConnection();
