const express = require('express');
const TransactionsDao = require('../dataBase/transactions.dao');
const Transaction = require('../models/transaction');
const router = express.Router();

const TRANSACTIONS_DAO = new TransactionsDao();

router.get('/', async (req, res) => {
    const transactions = TRANSACTIONS_DAO.getTransactions(res);
});

router.post('/', async (req, res) => {
    res.json('received');
    TRANSACTIONS_DAO.add(req.body);
});

module.exports = router;