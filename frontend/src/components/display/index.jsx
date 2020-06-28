import React, { Component } from 'react';
//import axios from 'axios';
import './index.css';
import {Modal, Button, Form/* , Row, Col, Form */} from 'react-bootstrap';
import Input from '../widgets/input'

class Display extends Component {
  constructor(props) {
    super(props);
    this.modalForm = React.createRef();
    this.callback = this.callback.bind(this);
    this.state = {
      tableData: [],
      error: [/* 
        'Please fill category',
        'Please fill title',
        'Please fill exp date',
        'Please fill amount' */
      ],
      exampleInputCategory: '',
      exampleInputTitle: '',
      exampleInputExpDate: '',
      exampleInputAmount: '',
      exampleId: 0,
      addModalShow: false,
      curntItem: []
    };
  }
  componentDidMount() {
    this.getData();
  }
  getData() {
    var urlExpense = "http://localhost:3002/products";
    const fetchProduct = async () => {
      var response = await fetch(urlExpense);
      const responseData = await response.json();
      this.setState({
        tableData: responseData.products
      }, () => {
        this.setState({exampleId: responseData.products.length});
      });
    }
    fetchProduct();
  }
  isValidate(payload) {
    // var error = [];
    var condition = payload.category.length >= 3 &&
    payload.title.length >= 3 &&
    payload.exp_date &&
    payload.amount;
    /* if(/^\d{4}-\d{2}-\d{2}$/.test(payload.exp_date)) {
      error.push('Please enter valid date!!');
      this.setState({error});
      return false;
    } */
    /* if(/^-?\d*[.,]?\d{0,2}$/.test(payload.amount) === false) {
      error.push('Please use number for fill!!');
      this.setState({error});
      return false;
    } */
    return condition;
  }
  submitFormData(e) {
    e.preventDefault();
    var url = 'http://localhost:3002/product';
    var indexId = this.state.exampleId + 1;
    this.setState({exampleId: indexId});
    console.log(this.state.exampleId);
    const payload = {
        category: '', title: '', exp_date: '', amount: 0, id: 0
    }
    console.log(payload);
    payload.category = this.state.exampleInputCategory;
    payload.title = this.state.exampleInputTitle;
    payload.exp_date = this.state.exampleInputExpDate;
    payload.amount = this.state.exampleInputAmount;
    payload.id = this.state.exampleId;
    const addFetchProduct = async () => {
      let hasError = false;
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(response);
      if(!response.ok) {
        hasError = true;
      }
      const responseData = await response.json();
      console.log(responseData);
      if(hasError) {
        throw console.error(responseData.msg);
      }
      this.setState(prevState => ({
        tableData: [...prevState.tableData, payload],
      }));
    }
    addFetchProduct();
  }
  
  onFieldChange(event) {
    console.log(event.target.name, event.target.value);
    this.setState({[event.target.name]: event.target.value});
  }
  
  onFieldModalChange(event) {
    const name = event.target.name;
    const prevName = name.substring(0, name.lastIndexOf("Modal"));
    console.log(name.substring(0, name.lastIndexOf("Modal")), event.target.value);
    this.setState({[prevName]: event.target.value});
  }

  removeData(item) {
    console.log(item.id);
    var url = `http://localhost:3002/product/${item.id}`;
    const removeFetchProduct = async () => {
      let hasError = false;
      const response = await fetch(url, {
        method: 'delete',
        body: JSON.stringify(item),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if(!response.ok) {
        hasError = true;
      }
      const responseData = await response//.json();
      if(hasError) {
        throw new Error(responseData.message);
      }
      var removeByAttr = function(arr, attr, value){
        var i = arr.length;
        while(i--){
           if( arr[i] 
               && arr[i].hasOwnProperty(attr) 
               && (arguments.length > 2 && arr[i][attr] === value ) ){ 
    
               arr.splice(i,1);
    
           }
        }
        return arr;
      }
      removeByAttr(this.state.tableData, 'id', item.id);
      this.setState({
        tableData: removeByAttr(this.state.tableData, 'id', parseInt(item.id))
      });
    }
    removeFetchProduct();
  }
  changeFieldValue(name, value) {
    console.log(name, value);
  }
  callback(name, value) {
    this.setState({[name]: value});
    console.log('callback', name, value);
  }
  render() {
    //let addModalShow = () => this.setState({addModalShow: false});
    return (
      <div className="display-block">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h3>Expense Entry</h3>
              <hr/>
              {this.state.error.length > 0 && <div className="">{this.state.error.map((i, j) => {
                return (<span className="err-msg" key={j}>{i}</span>)
              })}<hr/></div>}
              <form onSubmit={this.submitFormData.bind(this)}>
                <div className="form-group">
                  <label htmlFor="exampleInputCategory">Category</label>
                  <Input
                    ref={(node) => {
                      this.nameChangeFirstName = node;
                    }}
                    id="exampleInputCategory"
                    name="exampleInputCategory"
                    ariaDescribedby="CategoryHelp"
                    placeholder="Enter Category"
                    parentCallback={this.callback}
                    /* onChanges={(e) => this.changeFieldValue("exampleInputCategory", e.target.value)} */
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputTitle">Title</label>
                  <Input
                    ref={(node) => {
                      this.nameChangeFirstName = node;
                    }}
                    className="form-control"
                    id="exampleInputTitle"
                    name="exampleInputTitle"
                    ariaDescribedby="TitleHelp"
                    placeholder="Enter Title"
                    parentCallback={this.callback}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputExpDate">Exp Date</label>
                  <input
                    type="text"
                    value={this.state.expDate}
                    onChange={this.onFieldChange.bind(this)}
                    className="form-control"
                    id="exampleInputExpDate"
                    name="exampleInputExpDate"
                    aria-describedby="ExpDateHelp"
                    placeholder="Enter Exp Date" />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputAmount">Amount</label>
                  <input
                    type="text"
                    value={this.state.amount}
                    onChange={this.onFieldChange.bind(this)}
                    className="form-control"
                    id="exampleInputAmount"
                    name="exampleInputAmount"
                    aria-describedby="AmountHelp"
                    placeholder="Enter Amount" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
              </form>
              </div>
            {this.state.tableData.length > 0 && <div className="col-md-6">
              <h3>Expense List</h3>
              <table className="display-block-table table">
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Title</th>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Delete</th>
                    <th>Edit</th>
                  </tr>
                </thead>
                <tbody id="exp_tbody">
                  {this.state.tableData.map((item, j) => {
                    return (<tr key={j}>
                              <td>{item.category}</td>
                              <td>{item.title}</td>
                              <td>{item.exp_date}</td>
                              <td>{item.amount}</td>
                              <td onClick={() => {this.removeData(item)}}>X</td>
                              <td>
                                <Button variant="primary" onClick={() => {
                                  this.setState({
                                    addModalShow: true,
                                    curntItem: item
                                  })}
                                }>
                                  Edit
                                  </Button>
                                </td>
                            </tr>)
                  })}
                </tbody>
              </table>
              {/** Modal */}
              <Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={this.state.addModalShow}
                ref={this.modalForm}
              >
                <Form>
                  <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                      Modal heading
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form.Group controlId="formBasicCategory">
                      <Form.Label>Category </Form.Label>
                      <Form.Control
                        type="text"
                        value={this.state.curntItem.categoryModal}
                        name="exampleInputCategoryModal"
                        placeholder="Enter Category"
                        onChange={this.onFieldModalChange.bind(this)}
                      />
                    </Form.Group>

                    <Form.Group controlId="formBasicTitle">
                      <Form.Label>Title</Form.Label>
                      <Form.Control
                        type="text"
                        value={this.state.curntItem.titleModal}
                        name="exampleInputTitleModal"
                        placeholder="Enter Title"
                        onChange={this.onFieldModalChange.bind(this)}
                      />
                    </Form.Group>
                    <Form.Group controlId="formBasicDate">
                      <Form.Label>Exp Date</Form.Label>
                      <Form.Control
                        type="text"
                        value={this.state.curntItem.exp_dateModal}
                        name="exampleInputExpDateModal"
                        placeholder="Enter Date"
                        onChange={this.onFieldModalChange.bind(this)}
                      />
                    </Form.Group>
                    <Form.Group controlId="formBasicAmount">
                      <Form.Label>Amount</Form.Label>
                      <Form.Control
                        type="text"
                        value={this.state.curntItem.amountModal}
                        name="exampleInputAmountModal"
                        placeholder="Enter Amount"
                        onChange={this.onFieldModalChange.bind(this)}
                      />
                    </Form.Group>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button onClick={() => this.setState({addModalShow: false})}>Close</Button>
                  </Modal.Footer>
                </Form>
              </Modal>
            </div>}
          </div>
        </div>
        
      </div>
    );
  }
}
 
export default Display;