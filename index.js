/* Two step solution
	
	1. Download list of transactions with the help of the api provided
	2. Write a module that recursively computes the ancestry and sorts in descending order of ancestry
	3. Print top 10
*/


// var fs= require("fs")

// var path =require("path")

// var findTransactions = require("./lib/findTransactions")

// findTransactions()
// .then(transactions=>{
// 	console.log("transactions", transactions);
// 	fs.writeFile(path.resolve(__dirname,"./data/transactions.json"), JSON.stringify(transactions), "utf8", function(){
// 		console.log("File written")
// 	})
// })
// .catch(err=>{
// 	console.log("err",err)
// })


var transactionsList = require("./data/transactions.json")

var computeAncestry = require("./lib/computeAncestry")

console.log("computeAncestry", computeAncestry(transactionsList));