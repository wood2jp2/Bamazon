const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection {
  host: '127.0.0.1',
  user: 'root',
  password: 'root',
  database: 'bamazon_DB',
  port: 3306
};
