import React from 'react';
import { Button, Container, Row, Col, Table, Form } from 'react-bootstrap';
import axios from 'axios';
import './ExpensesListStyles.css';
import moment from 'moment';

export default class PersonList extends React.Component {
    constructor(){
        super();
        this.state = {
            expensesData:[],
            _id:'',
            expenseDate: new Date(),
            description:'',
            expenseType:"Income",
            amount:0,
            btnName:"Submit"
        }

        console.log("Init",this.state.expensesData);
    }

    componentDidMount() {
       this.listExpenses();
    }

    listExpenses = () => {
        axios.get(`http://localhost:3000/expenses`)
          .then(res => {
            const expenses = res.data;
            this.setState({ expensesData: expenses}, ()=>{console.log("Init",this.state.expensesData);});
          })
    }

    handleDateChange = (event) => {
        this.setState({expenseDate: event.target.value});
    }

    handleDescriptionChange = (event) => {
        this.setState({description: event.target.value});
    }

    handleExpenseTypeChange = (event) => {
        this.setState({expenseType: event.target.value});
    }

    handleAmountChange = (event) => {
        this.setState({amount: event.target.value});
    }

    addExpense = (event) => {
        const expenseData = {
            date: this.state.expenseDate,
            description: this.state.description,
            expenseType:this.state.expenseType,
            amount:this.state.amount,
        }

        console.log("data", expenseData);
        axios.post(`http://localhost:3000/expenses`, expenseData)
          .then(res => {
            if(res)
            this.listExpenses();
            console.log("Init",res);
          })
    }

    updateExpense = (event) => {
        const expenseData = {
            date: this.state.expenseDate,
            description: this.state.description,
            expenseType:this.state.expenseType,
            amount:this.state.amount,
        }

        console.log("data", expenseData);
        axios.put(`http://localhost:3000/expenses/${this.state._id}`, expenseData)
          .then(res => {
            if(res)
            this.listExpenses();
            console.log("Init",res);
          })
    }

    editExpense = (index, id, date, description, expenseType, amount) => {
        this.setState({
            _id: id,
            btnName:'Update',
            expenseDate: moment(date).format("yyyy-MM-dd"),
            description: description,
            expenseType: expenseType,
            amount: amount
        })
    }

    deleteExpense = (index, id) => {
        console.log("ID", id);
        axios.delete(`http://localhost:3000/expenses/${id}`)
          .then(res => {
            if(res)
            this.listExpenses();
            console.log("Init",this.state.expensesData);
          })
    }

    render(){
        const {expensesData, btnName} =  this.state;
        return (
            <Container>
                <Row>
                    <Col>
                    <p style={{fontSize:30}} className="tabSubmitleHeading">Expenses Management List</p>
                    </Col>
                </Row>
                <Row>
                <Form onSubmit={btnName == 'Update' ? this.updateExpense : this.addExpense}>
                    <Form.Group controlId="formExpense">
                        <Row>                            
                            <Col sm={5}>
                                <Form.Label>Date</Form.Label>
                            </Col>
                            <Col sm={7}>
                                <Form.Control type="date" placeholder="Enter the date (DD/MM/YYYY)" value={this.state.expenseDate} onChange={this.handleDateChange}/>
                            </Col>
                        </Row>
                        
                        <Row>
                            <Col sm={5}>
                                <Form.Label>Description</Form.Label>
                            </Col>
                            <Col sm={7}>
                                <Form.Control type="text" placeholder="Enter the description" value={this.state.description} onChange={this.handleDescriptionChange}/>
                            </Col>
                        </Row>

                        <Row>
                            <Col sm={5}>
                                <Form.Label>Expense Type</Form.Label>
                            </Col>
                            <Col sm={7}>
                                <Form.Control as="select" value={this.state.expenseType} onChange={this.handleExpenseTypeChange}>
                                    <option value="Income">Income</option>
                                    <option value="Expense">Expense</option>                           
                                </Form.Control>
                        </Col>
                        </Row>

                        <Row>
                            <Col sm={5}>
                                <Form.Label>Amount</Form.Label>
                            </Col>
                            <Col sm={7}>
                                <Form.Control type="number" placeholder="Enter the amount" value={this.state.amount} onChange={this.handleAmountChange} />
                            </Col>
                        </Row>           
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        {btnName}
                    </Button>
                    </Form>           
                </Row>                
                <Row>
                    <Col></Col>
                </Row>
                <Row>
                  <Table striped bordered hover>
                      <thead>
                          <tr>
                          <th>#</th>
                          <th>Date</th>
                          <th>Descriptions</th>
                          <th>Income/Expense</th>
                          <th>Amount</th>
                          <th>Actions</th>
                          </tr>
                      </thead>
                      <tbody>                          
                          {
                              expensesData.map((item, index) => {
                                  return(
                                        <tr key={index}>
                                            <td>{index+1}</td>                                            
                                            <td>{moment(new Date(item.date)).format('DD/MM/YYYY')}</td>
                                            <td>{item.description}</td>
                                            <td>{item.expenseType}</td>
                                            <td>{item.amount}</td>
                                            <td colSpan="2"><Button variant="info" onClick={() => {this.editExpense(index, item._id, item.date, item.description, item.expenseType, item.amount)}}>Edit</Button>  <Button variant="danger" onClick={() => {this.deleteExpense(index, item._id)}}>Delete</Button></td>
                                        </tr>
                                  )
                              })
                          }
                      </tbody>
                  </Table>                  
                </Row>
            </Container>
          );
    }    
  }