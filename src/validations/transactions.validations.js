
class TransactionsValidator{
    
    validateTransaction(json){

        if(json.concepto == '' || json.monto == '' || json.fecha == '' || json.tipo == ''){
            throw new Error('Ninguno de los campos debe estar vacio');
        }

    }

    validateNewTransaction(newTransaction, lastTransaction){
        try {
            this.validateTransaction(newTransaction);
        } catch (error) {
            throw error;
        }
        if(lastTransaction.tipo != newTransaction.tipo){
            throw new Error('No puede cambiar el tipo de operacion');
        }
    }

}

module.exports = TransactionsValidator;