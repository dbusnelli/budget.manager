const { json } = require('body-parser');
const Transaction = require('../models/transaction');

class TransactionsDao {

    async getTransactions(res){
        const transactions = await Transaction.find();
        res.json(transactions);
    }

    async getTransaction(id, res){
        const transaction = await Transaction.findById(id);
        res.json(transaction);
    }

    async add(req){
        const { concepto, monto, fecha, tipo} = req.body;
        const newTransaction = await new Transaction({concepto, monto,fecha, tipo});
        await newTransaction.save();
    }

    async update(req){
        const { concepto, monto, fecha, tipo} = req.body;
        const updatedTransaction = {concepto, monto, fecha, tipo};
        await Transaction.findByIdAndUpdate(req.params.id, updatedTransaction);
    }

    async delete(id){
        await Transaction.findByIdAndDelete(id);
    }

}

module.exports = TransactionsDao;