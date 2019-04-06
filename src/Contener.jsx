import React from 'react';
import { Button, Form, FormGroup, Label, Input, Alert, ListGroup, ListGroupItem, Progress } from 'reactstrap';
import {Pie} from 'react-chartjs';

class Contener extends React.Component {

    INCOME_CATEGORIES = ['PENSJA', 'ZLECENIA', 'INNE'];
    COST_CATEGORIES = ['MIESZKANIE', 'ROZRYWKA', 'ZAKUPY'];

    constructor(props) {
        super(props);
        this.state = {
            income: {
                value: 0,
                desc: "",
                category: this.INCOME_CATEGORIES[0],
                date: new Date().toDateInputValue(),
                result: 0,
                list: []
            },
            cost: {
                value: 0,
                desc: "",
                category: this.COST_CATEGORIES[0],
                date: new Date().toDateInputValue(),
                result: 0,
                list: []
            },
            result: 0,
            showAlert: false,
        };
    }

    handleIncomeValueChange = (event) => {
        this.setState({income: {...this.state.income, value: event.target.value}});
    };

    handleCostValueChange = (event) => {
        this.setState({cost: {...this.state.cost, value: event.target.value}});
    };

    handleIncomeDataChange = (event) => {
        this.setState({income: {...this.state.income, date: event.target.value}});
    };

    handleCostDataChange = (event) => {
        this.setState({cost: {...this.state.cost, date: event.target.value}});
    };

    handleIncomeCategoryChange = (event) => {
        this.setState({income: {...this.state.income, category: event.target.value}});
    };

    handleCostCategoryChange = (event) => {
        this.setState({cost: {...this.state.cost, category: event.target.value}});
    };

    handleIncomeDescChange = (event) => {
        this.setState({income: {...this.state.income, desc: event.target.value}});
    };

    handleCostDescChange = (event) => {
        this.setState({cost: {...this.state.cost, desc: event.target.value}});
    };

    handleAddIncome = (e) => {
        e.preventDefault();

        const newList = [...this.state.income.list, {
            date: this.state.income.date,
            value: this.state.income.value,
            desc: this.state.income.desc,
            category: this.state.income.category
        }];

        const newResult = this.state.income.result + Number(this.state.income.value);

        // this.setState({income: {list: newList, result: newResult, value: 0, desc:'', category: this.INCOME_CATEGORIES[0], date: new Date().toDateInputValue()}});
    
        // this.setState({result: this.state.income.result - this.state.cost.result});

        this.setState((state) => {
            return {
                result: newResult - state.cost.result
            }
        })
        this.setState(() => {
            return {
                income: {list: newList, result: newResult, value: 0, desc:'', category: this.INCOME_CATEGORIES[0], date: new Date().toDateInputValue()}
            }
        })
    }

    handleAddCost = (e) => {
        e.preventDefault();
        
        const newList = [...this.state.cost.list, {
            date: this.state.cost.date,
            value: this.state.cost.value,
            desc: this.state.cost.desc,
            category: this.state.cost.category
        }];

        const newResult = this.state.cost.result + Number(this.state.cost.value);
        const showAlert = newResult > this.state.income.result;

        this.setState({cost: {list: newList, result: newResult, value: 0, desc:'', category: this.COST_CATEGORIES[0], date: new Date().toDateInputValue()}, showAlert});
        this.setState((state) => {
            return {
                result: this.state.income.result - newResult
            }
        })
    }

    render() {
        const income = this.state.income;
        const cost = this.state.cost;

        const pensjaValue = income.list.reduce((current, el) => current + (el.category === 'PENSJA' ? Number(el.value) : 0), 0);
        const zleceniaValue = income.list.reduce((current, el) => current + (el.category === 'ZLECENIA' ? Number(el.value) : 0), 0);
        const inneValue = income.list.reduce((current, el) => current + (el.category === 'INNE' ? Number(el.value) : 0), 0);

        const mieszkanieValue = cost.list.reduce((current, el) => current + (el.category === 'MIESZKANIE' ? Number(el.value) : 0), 0);
        const rozrywkaValue = cost.list.reduce((current, el) => current + (el.category === 'ROZRYWKA' ? Number(el.value) : 0), 0);
        const zakupyValue = cost.list.reduce((current, el) => current + (el.category === 'ZAKUPY' ? Number(el.value) : 0), 0);


        // const domValue = 1;

        const incomeChartData = [
            {
                value: pensjaValue,
                color:"#D31996",
                highlight: "#FF5A5E",
                label: "PENSJA"
            },
            {
                value: zleceniaValue,
                color: "#708D91",
                highlight: "#5AD3D1",
                label: "ZLECENIA"
            },
            {
                value: inneValue,
                color: "#19DD89",
                highlight: "#FFC870",
                label: "INNE"
            }
        ];

        const costChartData = [
            {
                value: mieszkanieValue,
                color:"#19DD89",
                highlight: "#FF5A5E",
                label: "MIESZKANIE"
            },
            {
                value: rozrywkaValue,
                color: "#708D91",
                highlight: "#5AD3D1",
                label: "ROZRYWKA"
            },
            {
                value: zakupyValue,
                color: "#D31996",
                highlight: "#FFC870",
                label: "ZAKUPY"
            }
        ];

        return (
            <div><p className="contener-title">Aktualny budżet: {this.state.result} zł</p>
            <div className="contener">
                <Form className="contener-income"> 
                <Pie className="contener-chart" data={incomeChartData} width={300} height={300}/>               
                    <FormGroup>
                        <Label for="incomeDate">Data</Label>
                        <Input type="date" name="date" id="incomeDate" value={income.date} onChange={this.handleIncomeDataChange}></Input>
                    </FormGroup>

                    <FormGroup>
                        <Label for="incomeCategory">Kategoria przychodów</Label>
                        <Input type="select" name="select" id="incomeCategory"  onChange={this.handleIncomeCategoryChange} value={income.category}>
                            {this.INCOME_CATEGORIES.map(cat => <option>{cat}</option>)}    
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="incomeDesc">Opis</Label>
                        <Input type="text" name="text" id="incomeDesc" value={income.desc} onChange={this.handleIncomeDescChange}></Input>
                    </FormGroup>

                    <FormGroup>
                        <Label for="incomePrice">Wartość</Label>
                        <Input 
                            id="incomePrice"
                            type="number" 
                            value={income.value} 
                            name ="incomePrice" 
                            onChange={this.handleIncomeValueChange} 
                            placeholder={"Dodaj przychód"}
                        />
                    </FormGroup>
                    <Button 
                        block
                        size="lg"
                        color="success"
                        type="button"
                        value="Przelicz przychód"
                        onClick={this.handleAddIncome}>
                        Dodaj przychód!
                    </Button>

                    </Form>
                    <Form className="contener-income-list">
                    {this.state.showAlert && <Alert color="danger">
                      Twoje wydatki przekroczyły przychody!
                    </Alert>}
                   <ListGroup>
                        {income.list.map((element) => {
                            return( <ListGroupItem> [{element.date}] <b>{element.category}</b> - {element.desc}: {element.value} zł </ListGroupItem>)
                        })}
                        <p>Suma przychodów: <p className="contener-income-sumary">{income.result} zł</p></p>
                    </ListGroup>
                    <ListGroup>
                        {cost.list.map((element) => {
                            return( <ListGroupItem> [{element.date}] <b>{element.category}</b> - {element.desc}: {element.value} zł</ListGroupItem>)
                        })}
                        <p>Suma wydatków: <p className="contener-cost-sumary">{cost.result} zł </p></p>
                    </ListGroup>
                   
                </Form>
            <Form className="contener-cost">

            

                    <Pie className="contener-chart" data={costChartData} width={300} height={300} />

                    <FormGroup>
                        <Label for="costDate">Data</Label>
                        <Input type="date" name="date" id="costDate" value={cost.date} onChange={this.handleCostDataChange}></Input>
                    </FormGroup>

                    <FormGroup>
                        <Label for="costCategory">Kategoria wydatków</Label>
                        <Input type="select" name="select" id="costCategory"  onChange={this.handleCostCategoryChange} value={cost.category}>
                            {this.COST_CATEGORIES.map(cat => <option>{cat}</option>)}    
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="costDesc">Opis</Label>
                        <Input type="text" name="text" id="costDesc" value={cost.desc} onChange={this.handleCostDescChange}></Input>
                    </FormGroup>

                    <FormGroup>
                        <Label for="costPrice">Wartość</Label>
                        <Input 
                            id="costPrice"
                            type="number" 
                            value={cost.value} 
                            name ="costPrice" 
                            onChange={this.handleCostValueChange} 
                            placeholder={"Dodaj wydatek"}
                            width="200px"
                        />
                    </FormGroup>
                    <Button
                        block
                        size="lg"
                        color="danger"
                        type="button"
                        value="Przelicz wydatek!"
                        onClick={this.handleAddCost}>
                        Dodaj wydatek!
                    </Button>
                    

                    </Form>
                   
                    </div>
        </div>
        );
    }
}

export default Contener;