const express = require('express');
const router = express.Router();

const Task = require('../models/transaction')

router.get('/', (req, res) => {
    Task.find((err, transactions) => {
        console.log(transactions);
    })
    
    res.json({
        status: 'API works'
    });
});

module.exports = router;