CREATE DATABASE bamazon_DB

USE bamazon_DB

CREATE TABLE products (
item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
product_name VARCHAR(200) NOT NULL,
department_name VARCHAR(200) NOT NULL,
price DECIMAL(11,2) NOT NULL,
stock_quantity INTEGER(11) NOT NULL,
PRIMARY KEY(item_id)
)

INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES ('TV', 'electronics', 1499.99, 20)
, ('toilet paper', 'bathroom', 6.50, 100), ('cup', 'kitchen', 3.99, 30), ('magazine', 'stationary', 2.49, 5),
('Ketchup', 'Condiments', 3.25, 40), ('Hat', 'Clothing', 24.99, 10), ('MacBook', 'electronics', 1699.99, 10),
('Desk', 'Furniture', 99.99, 3), ('Spatula', 'kitchen', 12.33, 5), ('Guitar', 'Music', 299.99, 1)

CREATE TABLE departments (
department_id INTEGER(11) AUTO_INCREMENT NOT NULL,
department_name VARCHAR(200) NOT NULL,
over_head_costs DECIMAL(11,2) NOT NULL,
PRIMARY KEY(department_id)
)

ALTER TABLE products ADD product_sales DECIMAL(11,2) NOT NULL;
