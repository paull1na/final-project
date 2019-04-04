import React from 'react';

class Contener extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputIncome: 0,
            inputIncomeResult: 0,
            inputCostResult: 0,
            inputCost: 0,
            date: new Date().toDateInputValue(),
            inputTextIncome: '',
            inputTextCost: '',
            date: new Date().toDateInputValue(),
            listincome: [],
            listcost: []
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
    handleTextIncomeChange = (event) => {
        this.setState({inputTextIncome: event.target.value});
    };
    handleTextCostChange = (event) => {
        this.setState({inputTextCost: event.target.value});
    };
    buttonOnClickIncome = (e) => {
        e.preventDefault();
        console.log(e)
        this.setState({
            inputIncomeResult: this.state.inputIncomeResult + Number(this.state.inputIncome)
        });


        this.setState({ listincome: [...this.state.listincome, {inputIncome: Number(this.state.inputIncome), text: this.state.inputTextIncome, date: this.state.date} ]})
    }

    buttonOnClickCost = (e) => {
        e.preventDefault();
        
        console.log(e)
        this.setState({
            inputCostResult: this.state.inputCostResult - Number(this.state.inputCost)
        });

        this.setState({ listcost: [...this.state.listcost, {inputCost: Number(this.state.inputCost), text: this.state.inputTextCost, date: this.state.date}]})
    }
    



        render(){
        return (
            <div className="contener">
                <div className="contener-income">
                <h1>Przychody:</h1>
                <input type="date" name="date" value={this.state.date} onChange={this.handleDataChange}/>
                <input type="text" value={this.state.inputTextIncome} name ="inputTextIncome" onChange={this.handleTextIncomeChange} />

                <input type="number" value={this.state.inputIncome} name ="inputIncome" onChange={this.handleIncomeChange} placeholder={"Dodaj przychód"} />
                <button type="button" disabled={this.state.inputCost} value="Przelicz przychód" onClick={this.buttonOnClickIncome}>Przelicz przychód!</button>
               
                <ul>
                    {this.state.listincome.map((element) => {
                        return( <li> {element.inputIncome} {element.text} {element.date}</li>)
                    })}
                    <p>{this.state.inputIncomeResult}</p>
                </ul>
            </div>
            <div className="contener-chart">
            </div>
            <div className="contener-cost">
            <h1>Koszty:</h1>
            <input type="text" value={this.state.inputTextCost} name ="inputTextCost" onChange={this.handleTextCostChange} />
                <input type="number" value={this.state.inputCost} name ="inputCost" onChange={this.handleCostChange} placeholder={"Dodaj koszt"} />
                <button type="button" disabled={this.state.inputIncome} value="Przelicz koszt" onClick={this.buttonOnClickCost}>Przelicz koszt!</button>
           
                <ul>
                    {this.state.listcost.map((elements) => {
                        return( <li> {elements.inputCost} {elements.text} {elements.date}</li>)
                    })}
                    <p>{this.state.inputCostResult}</p>
                </ul>
            </div>
                

                
        </div>
    );
    }
}

export default Contener;