const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'root',
  database: 'bamazon_DB',
  port: 3306
});

var bamazon = {

  createConnection: function() {
    connection.connect(function(err) {
      if (err) throw (err);
      console.log('Connected to bamazon_DB!');
      bamazon.displayProducts();
    });
  },

  displayProducts: function() {
    connection.query('SELECT * from products', function(err, res) {
      if (err) throw (err);
      console.log("Products available: ")
      for (let i = 0; i < res.length; i++) {
        console.log(res[i].item_id + ' - ' + res[i].product_name +
          ". Price: $" + res[i].price)
      };
    });
  },

  firstPrompt: function() {
    inquirer.prompt([{
      name: 'itemID',
      message: 'What is the ID of the product you\'d like to buy?'
    }, {
      name: 'quantity',
      message: 'How many would you like to buy?'
    }]).then(function(answers) {
      var itemID = answers.itemID;
      var itemQty = parseInt(answers.quantity);

    })
  }
};

bamazon.createConnection();
