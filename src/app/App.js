import React from 'react';

class App extends React.Component {
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
                                    <form onSubmit= "#">
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input type="text" placeholder="Concepto"/>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input type="number" placeholder="Monto"/>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input type="date"/>
                                            </div>
                                        </div>
                                        <div className="row">
                                        <label>Tipo</label>
                                            <div className="input-field col s12">
                                                <p>
                                                    <label>
                                                        <input value="ingreso" type="radio" name="tipo"/>
                                                            <span>Ingreso</span>
                                                    </label>
                                                </p>
                                                <p>
                                                    <label>
                                                        <input value="egreso" type="radio" name="tipo"/>
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
                        <div className="cols s7">

                        </div>
                    </div>

                </div>
            </div>
        )    
    }
}

export default App;