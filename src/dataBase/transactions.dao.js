const Transaction = require('../models/transaction');

class TransactionsDao {

    async getTransactions(res){
        const transactions = await Transaction.find();
        res.json(transactions);
    }

    async add(tr){
        const { concepto, monto, fecha, tipo} = tr;
        const newTransaction = await new Transaction({concepto, monto,fecha, tipo});
        await newTransaction.save();
        console.log(newTransaction);
    }

}

module.exports = TransactionsDao;