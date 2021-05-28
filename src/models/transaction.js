const mongoose = require('mongoose');
const {Schema} = mongoose;

const TransactionSchema = new Schema({
    concepto: {type: String, required: true},
    monto: {type: Number, required: true},
    fecha: {type: String, required: true},
    tipo: {type: String, required: true}
});

module.exports = mongoose.model('Transaction', TransactionSchema);