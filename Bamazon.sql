DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products (
	id INTEGER NOT NULL auto_increment,
    product_name VARCHAR(30) NOT NULL,
    department_name VARCHAR(30) NOT NULL,
    price NUMERIC NOT NULL,
    stock_quantity INTEGER,
    PRIMARY KEY (id)
); 

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Headphones", "Music", 100.00, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Stereo", "Music", 175.00, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Hardcover Book", "Books", 25.00, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Men's Jeans", "Mens Clothes", 30.00, 8);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Paperback Book", "Books", 12.00, 6);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Skyrim", "Video Games", 50.00, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Smash Brothers Ultimate", "Video Games", 50.00, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Men's Socks", "Mens Clothes", 8.00, 12);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Turntable", "Music", 100.00, 4);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Contra", "Video Games", 16.00, 8);


