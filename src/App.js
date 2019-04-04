import React from 'react';
import Header from './Header';
import Contener from './Contener';
import Footer from './Footer';
import background from './background.jpg';

import './App.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputIncome: 0,
            inputIncomeResult: 0,
            inputCost: 0,
            date: new Date().toDateInputValue(),
            inputText: '',
            list: []
        };
    }

    handleIncomeChange = (event) => {
        this.setState({inputIncome: event.target.value});
    };

    handleCostChange = (event) => {
        this.setState({inputCost: event.target.value});
    };

    handleDataChange = (event) => {
        this.setState({date: event.target.value});
    };
    handleTextChange = (event) => {
        this.setState({inputText: event.target.value});
    };
    buttonOnClickIncome = (e) => {
        e.preventDefault();
        console.log(e)
        this.setState({
            inputIncomeResult: this.state.inputIncomeResult + Number(this.state.inputIncome)
        });


        this.setState({ list: [...this.state.list, {inputIncome: Number(this.state.inputIncome), text: this.state.inputText} ]})
    }

    buttonOnClickCost = (e) => {
        e.preventDefault();
        console.log(e)
        this.setState({
            inputIncomeResult: this.state.inputIncomeResult - Number(this.state.inputCost)
        });
    }
    



        render(){
        return (
            <div className="App">
                <Header/>
                <Contener/>

            </div>
            
    );
    }
}

export default App;