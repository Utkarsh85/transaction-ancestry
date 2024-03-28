module.exports = function (transactions) {
	// computes ancestry of all transactions
	/*
		transactions = [
			{
				"txid": "37dd3d",
				"vin": [{
					"txid": "djkhdd3d",
				}]
				...
			}
		]
	*/

	var transactionsAncestry = transactions.map(transaction=>{
		return {
			txid: transaction.txid,
			ancestry: findAncestry(transaction.txid, transactions)
		}
	}).sort((a,b)=>{
		return a.ancestry>b.ancestry;
	});

	return transactionsAncestry.slice(0,10);
}

var findAncestry = function(txid, transactions) {
	// find the transaction in transactions by txid
	// loop through vin, check whether transaction exist in transactions and recursively call findAncestry,if transaction is found
	// findAncestry returns the ancestry count
	
	let transactionInd = findTransactioninTransactionsArray(txid, transactions)
	if(transactionInd < 0)
		return 0;
	let transaction = transactions[transactionInd]

	let vin = transaction.vin

	return vin.reduce((r, inputTransaction)=>{
		let inputTransactionInd = findTransactioninTransactionsArray(inputTransaction.txid, transactions)
		if(inputTransactionInd < 0)
			return r;
	
		return r+1+findAncestry(inputTransaction.txid, transactions)
	}, 0)

}

var findTransactioninTransactionsArray = function(txid, transactions) {
	return transactions.map(x=>x.txid).indexOf(txid);
}