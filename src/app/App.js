import React from 'react';
import transaction from '../models/transaction';
const TransactionsValidator = require('../validations/transactions.validations');
const TRANSACTIONS_VALIDATOR = new TransactionsValidator();

class App extends React.Component {

    constructor(){
        super();
        this.state = {
            concepto: '',
            monto: '',
            fecha: '',
            tipo: '',
            transactions: [],
            _id: ''
        };
        this.addTransaction = this.addTransaction.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.transactions = [];
        this.newTransaction = null;
    }

    addTransaction(){
        if (this.state._id) {
            
            try {
                TRANSACTIONS_VALIDATOR.validateNewTransaction(this.state, this.newTransaction);
                fetch('/api/transactions/' + this.state._id,{
                    method: 'PUT',
                    body: JSON.stringify(this.state),
                    headers: {
                        'Accept': 'aplication/json',
                        'Content-Type': 'application/json'
                    }
                })
                .then(res => res.json())
                .then(data => console.log(data));
                alert('Transaccion actualizada');
                this.setState({id: null});
                this.newTransaction = null;
            } catch (error) {
                alert(error.message)
            }
        }else{
            try {

                TRANSACTIONS_VALIDATOR.validateTransaction(this.state);

                fetch('/api/transactions', {
                    method: 'POST',
                    body: JSON.stringify(this.state),
                    headers: {
                        'Accept': 'aplication/json',
                        'Content-Type': 'application/json'
                    }
                })
    
                .then(res => res.json())
                .then(data => {
                console.log(data);
                })
                .catch(err => console.log(err))
    
                this.setState({concepto: '', monto: '', fecha: '', tipo: ''})
                this.fetchTransactions();

                alert('Transaccion agregada');
            
            } catch (error) {
                alert(error.message)
            }
        }     
    }

    componentDidMount(){
        this.fetchTransactions()
    }

    fetchTransactions(){
        
        try {

            fetch('/api/transactions')
            .then(res => res.json())
            .then(data => {
                this.setState({transactions: data});
                this.transactions = this.state.transactions;
                this.printAccountsBalanceInHTML();
            })

        } catch (error) {
            alert(error.message)
        }
    }

    deleteTransaction(id){
        if (confirm('¿Estas seguro?')) {
            fetch('/api/transactions/'+id, {
                method : 'DELETE',
                headers: {
                    'Accept': 'aplication/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                alert('Transaccion eliminada');
                this.fetchTransactions();
            })
        }
    }

    editTransaction(id){
        alert('Edite en el formulario');
        fetch('/api/transactions/'+id)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                this.setState({
                    concepto: data.concepto,
                    monto: data.monto,
                    fecha: data.fecha,
                    tipo: data.tipo,
                    _id: data._id
                });
                this.newTransaction = this.state;
            });
    }

    handleChange(e){
        const {name, value} = e.target;
        this.setState({
            [name]: value
        })
    }

    printAccountsBalanceInHTML(){
        var id = "balance";
        var text = ('$' + this.calculateAccountBalance());
        document.getElementById(id).innerHTML = text;
    }

    calculateAccountBalance(){

        let value = 0;

        for (let i = 0; i < this.transactions.length; i++) {
            if(this.transactions[i].tipo == 'ingreso'){
                value +=  this.transactions[i].monto;
            }else{
                value -=  this.transactions[i].monto;
            }
        }

        return value
    }

    render(){
        return(
            <div>
                {/* Navigation */}
                <nav class ="indigo darken-4">
                    <div className="container">
                        <a className= "brand-logo" href="/">Budget Manager</a>
                    </div>
                </nav>

                <br/>

                <div className="container">
                    <div className="row">
                        <div className="col s5">
                            <div className="card">
                                <div className= "card-content">
                                    <form onSubmit= {this.addTransaction}>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input name= "concepto" onChange={this.handleChange} type="text" placeholder="Concepto" value={this.state.concepto}/>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input type="number" name= "monto" onChange={this.handleChange} placeholder="Monto" value={this.state.monto}/>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input name= "fecha" onChange={this.handleChange} type="date" value={this.state.fecha}/>
                                            </div>
                                        </div>
                                        <div className="row">
                                        <label>Tipo</label>
                                            <div className="input-field col s12">
                                                <p>
                                                    <label>
                                                        <input value="ingreso" onChange={this.handleChange} type="radio" name="tipo"/>
                                                            <span>Ingreso</span>
                                                    </label>
                                                </p>
                                                <p>
                                                    <label>
                                                        <input value="egreso" onChange={this.handleChange} type="radio" name="tipo"/>
                                                            <span>Egreso</span>
                                                </label>  
                                                </p>
                                            
                                            </div>
                                        </div>

                                        <button class="btn waves-effect indigo darken-3" type="submit" name="action">Enviar
                                            <i class="material-icons right">send</i>
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col s7">
                            <h3>Balance Final de Cuenta:</h3>
                            <h4 id="balance">$0</h4>
                        </div>
                    </div>

                    <hr/>

                    <table>
                        <thead>
                            <tr>
                                <th>Concepto:</th>
                                   <th>Monto:</th>
                                   <th>Fecha:</th>
                                <th>Tipo:</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.transactions.map(transaction =>{
                                    return (
                                        <tr key={transaction._id}>
                                            <td>{transaction.concepto}</td>
                                            <td>{transaction.monto}</td>
                                            <td>{transaction.fecha}</td>
                                            <td>{transaction.tipo}</td>
                                            <td>
                                                <button class="btn indigo darken-3">
                                                    <i className="material-icons" onClick={() => this.editTransaction(transaction._id)}>edit</i>
                                                </button>
                                                <button class="btn red darken-3" style={{margin: '4px'}} onClick={() => this.deleteTransaction(transaction._id)}>
                                                    <i className="material-icons">delete</i>
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )    
    }
}

export default App;