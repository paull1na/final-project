import React from 'react';

class Income extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputIncome: 0,
        };
    }
    

handleIncomeChange = (event) => {
    this.setState({inputIncome: event.target.value});
};
buttonOnClickIncome = (e) => {
    e.preventDefault();
    console.log(e)
    this.setState({
        inputIncomeResult: this.state.inputIncomeResult + Number(this.state.inputIncome)
    });


    this.setState({ list: [...this.state.list, {inputIncome: Number(this.state.inputIncome), text: this.state.inputText} ]})
}
    render() {
        return (
            <div className="income">
                                <input type="number" value={this.state.inputIncome} name ="inputIncome" onChange={this.handleIncomeChange} placeholder={"Dodaj przychód"} />
                                <button type="button" disabled={this.state.inputCost} value="Przelicz przychód" onClick={this.buttonOnClickIncome}>Przelicz przychód!</button>


            </div>
        );
    }
}
export default Income;