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

ALTER TABLE products
ALTER COLUMN product_sales SET DEFAULT 0.00;

INSERT INTO departments(department_name, over_head_costs) VALUES ('electronics', 200), ('bathroom', 400),
('kitchen', 250), ('Sports', 50), ('Music', 100), ('Furniture', 400), ('stationary', 30),
('Condiments', 10), ('Clothing', 350)

SELECT departments.department_id, departments.department_name, departments.over_head_costs,
SUM(products.product_sales - departments.over_head_costs) AS total_profit,
SUM(products.product_sales) AS product_sales
FROM departments
LEFT JOIN products ON departments.department_name=products.department_name
GROUP BY department_id
