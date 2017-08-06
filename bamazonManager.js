// require node packages
const mysql = require('mysql');
const inquirer = require('inquirer');

// set up database connection
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'root',
  database: 'bamazon_DB',
  port: 3306
});

var bamazonManager = {

  // create connection to database using connect method
  createConnection: function() {
    connection.connect(function(err) {
      if (err) throw (err);
      console.log('Connected to bamazon_DB!');
      bamazonManager.displayOptions();
    });
  },

  displayOptions: function() {
    inquirer.prompt([{
      name: 'managerOptions',
      message: 'Please choose an option: ',
      type: 'list',
      choices: ['View Products for Sale', 'View Low Inventory',
        'Add to Inventory', 'Add New Product'
      ]
    }]).then(function(answers) {
      switch (answers.managerOptions) {
        case 'View Products for Sale':
          connection.query('SELECT * from products', function(err, res) {
            for (let i = 0; i < res.length; i++) {
              console.log(`${res[i].item_id}. ${res[i].product_name} - Price: $${res[i].price}. Quantity Available: ${res[i].stock_quantity}`)
            }
          });
          break;
        case 'View Low Inventory':
          connection.query('SELECT * from products WHERE stock_quantity<=5', function(err, res) {
            for (let i = 0; i < res.length; i++) {
              console.log(`${res[i].item_id}. ${res[i].product_name} - Price: $${res[i].price}. Quantity Available: ${res[i].stock_quantity}`)
            }
          });
          break;
        case 'Add to Inventory':
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
              var itemID = answers.itemToStock;
              var addQuantity = parseInt(answers.quantityToAdd);
              connection.query(`SELECT * from products WHERE item_id = ${itemID}`, function(err, res) {
                var refreshedQuantity = res[0].stock_quantity + addQuantity;
                if (addQuantity) {
                  connection.query(`UPDATE products SET stock_quantity = ${refreshedQuantity} WHERE item_id = ${itemID}`, function(err, res) {
                    console.log(`${res[0].product_name}'s QTY updated to ${refreshedQuantity}`);
                  });
                } else {
                  console.log('Please enter a number greater than zero!')
                }
              })
            });
          })
          console.log('add to inv');
          break;
        case 'Add New Product':
          console.log('add prod');
          break;
        default:
          console.log('default');
      }
    });
  },
};

bamazonManager.createConnection();
