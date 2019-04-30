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

var start = function() {
    connection.query("SELECT * FROM products", function(err,res){
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
            message: "Which product would you like to purchase?"
        }).then(function(answer) {
            for (var i = 0; i < res.length; i++) {
                if (res[i].product_name==answer.choice) {
                    var chosenItem = res[i];
                    inquirer.prompt({
                        name: "amount",
                        type: "input",
                        message: "How many would you like to buy?",
                        validate: function(value) {
                            if(isNaN(value)==false) {
                                return true;
                            } else {
                                return false;
                            }
                        }
                    }).then(function(answer) {
                        var runningAmt = chosenItem.stock_quantity - answer.amount;
                        if (runningAmt > 0) {
                            connection.query("UPDATE products SET ? WHERE ?", [{
                                stock_quantity: runningAmt
                            },{
                                product_name: chosenItem.product_name
                            }], function(err,res) {
                                console.log("Product successfully purchased!")
                                start();
                            })
                        } else {
                            console.log("Insufficient Stock")
                            start();
                        }
                    })
                }
            }
        })
    })
}