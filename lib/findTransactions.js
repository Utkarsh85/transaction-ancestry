const TRANSACTIONS_API = "https://blockstream.info/api/block/000000000000000000076c036ff5119e5a5a74df77abf64203473364509f7732/txs/"

var axios = require("axios");

module.exports = async function(){

	let offset = 0;
	let transactions =[];

	let apiError = false;

	while(!apiError) {
		try {
			outputTransactions = await fetchTransactions(offset)
			offset+=25;
			// console.log("Found transactions with offset - ", offset, outputTransactions)
			transactions = [...transactions, ...outputTransactions.data.map(transaction=>{
				return {
					txid: transaction.txid,
					vin: transaction.vin.map(inputTransaction=>inputTransaction.txid)
				}
			})]
		}
		catch(err){
			console.log(err);
			apiError = true;
		}
	}

	return transactions;

}

var fetchTransactions = function(offset){
	return axios.get(TRANSACTIONS_API+offset)
}

