var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host:"localhost",
    port: 3306,
    user:"root",
    password:"Athena08",
    database:"bamazon"
})

connection.connect(function(err) {
    console.log("Connected as id: " + connection.threadId);
    start();
})

function start() {
    inquirer.prompt({
        name: "menu",
        type: "list",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]

    }).then(function(answer) {
        if (answer.menu === "View Products for Sale") {
            viewProducts();
        } else if (answer.menu === "View Low Inventory") {
            lowInventory();
        } else if (answer.menu === "Add to Inventory") {
            addStock(value);
        } else if (answer === "Add New Product") {
            //addProduct()
        }
    })
}

function viewProducts() {
    connection.query("SELECT * FROM products", function(err,res){
        console.log(res);
        start();
    })
}

function lowInventory() {
    connection.query("SELECT * FROM products WHERE stock_quantity < 6", function(err, res) {
        console.log(res);
        start();
    })
}

function addStock(value) {
    connection.query("SELECT * FROM products", function(err,res) {
        console.log(res);
        inquirer.prompt({
            name: "choice",
            type: "rawlist",
            choices: function(value) {
                var choiceArray = [];
                for (var i = 0; i < res.length; i++) {
                    choiceArray.push(res[i].product_name);
                }
                return choiceArray;
            },
            message: "Which product to add inventory?"
        }).then(function(answer) {
            for (var i = 0; i < res.length; i++) {
                if (res[i].product_name==answer.choice) {
                    var chosenItem = res[i];
                    inquirer.prompt({
                        name: "amount",
                        type: "input",
                        message: "How much to add?",
                        validate: function(value) {
                            if(isNaN(value)==false) {
                                return true;
                            } else {
                                return false;
                            }
                        }
                    }).then(function(answer) {
                        var addedAmt = chosenItem.stock_quantity + answer.amount;
                        if (addedAmt > 0) {
                            connection.query("UPDATE products SET ? WHERE ?", [{
                                stock_quantity: addedAmt
                            },{
                                product_name: chosenItem.product_name
                            }], function(err,res) {
                                console.log("Inventory Successfully added!")
                                start();
                            })
                        }
                    }
                }
            }
        })
    })
}
 