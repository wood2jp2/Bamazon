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
var bamazonCustomer = {

  // create connection to database using connect method
  createConnection: function() {
    connection.connect(function(err) {
      if (err) throw (err);
      console.log('Connected to bamazon_DB!');
      bamazonCustomer.displayProducts();
    });
  },

  // this loops through and shows the items available for purchase from products table
  displayProducts: function() {
    connection.query('SELECT * from products', function(err, res) {
      if (err) throw (err);
      console.log("Products available: ")
      for (let i = 0; i < res.length; i++) {
        console.log(res[i].item_id + ' - ' + res[i].product_name +
          ". Price: $" + res[i].price)
      };
      bamazonCustomer.firstPrompt();
    });
  },

  // prompts the customer using inquirer, who can choose by ID based on products displayed
  firstPrompt: function() {
    inquirer.prompt([{
      name: 'itemID',
      message: 'What is the ID of the product you\'d like to buy?'
    }, {
      name: 'quantity',
      message: 'How many would you like to buy?'
    }]).then(function(answers) {

      // assigned variables for each answer, and turned the quantity into integer for future calculation
      var itemID = answers.itemID;
      var requestedQty = parseInt(answers.quantity);

      // accessing specific chosen item's data from DB
      connection.query(`SELECT * from products WHERE item_id = ${itemID}`,
        function(err, res) {

          // assigning variable to new quantity based on available stock and user request
          var newQuantity = parseInt(res[0].stock_quantity) - requestedQty;

          // checks to see if there is enough stock to complete order
          if (newQuantity >= 0) {
            var customerTotal = res[0].price * requestedQty;
            var productSales = res[0].product_sales + customerTotal;
            console.log(`Item purchased! Your total is: $${customerTotal}`);

            // if enough stock, updates quantity for item in database
            connection.query(`UPDATE products SET stock_quantity = ${newQuantity}, product_sales = ${productSales} WHERE item_id = ${itemID}`, function(err, res) {
              if (err) throw (err);
              console.log('Item quantity updated!')
            })
          } else {
            console.log(`Insufficient quantity! There are only ${res[0].stock_quantity} currently in stock and available to purchase!`)
          }
        })
    })
  }
};

bamazonCustomer.createConnection();
