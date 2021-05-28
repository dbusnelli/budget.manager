const express = require('express');
const TransactionsDao = require('../dataBase/transactions.dao');
const router = express.Router();

const TRANSACTIONS_DAO = new TransactionsDao();

router.get('/', async (req, res) => {
    TRANSACTIONS_DAO.getTransactions(res);
});

router.get('/:id', async (req, res) => {
    TRANSACTIONS_DAO.getTransaction(req.params.id, res);
});

router.post('/', async (req, res) => {
    TRANSACTIONS_DAO.add(req);
    res.json({status: 'Transaction added'});
});

router.put('/:id', async(req, res) => {
    TRANSACTIONS_DAO.update(req);
    res.json({status: 'Transaction updated'});
});

router.delete('/:id', async (req, res) => {
    TRANSACTIONS_DAO.delete(req.params.id);
    res.json({status: 'Transaction deleted'});
})

module.exports = router;