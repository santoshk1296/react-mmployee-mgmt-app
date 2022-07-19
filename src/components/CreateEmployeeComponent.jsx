import React, { Component } from 'react';
import { Link } from "react-router-dom";
import EmployeeService from '../services/EmployeeService';

class CreateEmployeeComponent extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            firstName: '',
            lastName: '',
            emailId: ''

        }

        this.changeFirstNameHandler=this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler=this.changeLastNameHandler.bind(this);
        this.changeEmailIdHandler=this.changeEmailIdHandler.bind(this);
        this.saveEmployee=this.saveEmployee.bind(this);

    }
    
    saveEmployee = (event) => {
        event.preventDefault();

        let employee = { firstName: this.state.firstName, lastName: this.state.lastName, emailId: this.state.emailId};

        console.log('employee => ' + JSON.stringify(employee));

        EmployeeService.createEmployee(employee).then(res => {
            
            if(res?.status===200) {
                console.log('employee created');
                window.location = "/employees";
            }    
        })
        .catch(error => {
            if (error.response) {
                console.log('Error=>'+error.response.data.details);
                alert(error.response.data.details);
            }
        });

    }

    changeFirstNameHandler = (event) => {

        this.setState({firstName: event.target.value});
    }

    changeLastNameHandler = (event) => {

        this.setState({lastName: event.target.value});
    }
    
    changeEmailIdHandler = (event) => {
        this.setState({emailId: event.target.value});
    }

    render() {
        
        return (
            <div>
                <div className='container'>
                    <div className='row'>
                        <div className='card col-md-6 offset-md-3 offset-md-3'>
                            <h3 className='text-center'>Add Employee</h3>
                            <div className='card-body'>
                                <form>
                                    <div className='form-control'>
                                        <label htmlFor='firstName' className="form-label">First Name</label>
                                        <input placeholder='First Name' className="form-control" name='firstName' value={this.state.firstName} onChange={this.changeFirstNameHandler} />

                                        <label htmlFor='lastName' className="form-label">Last Name</label>
                                        <input placeholder="Last Name" className="form-control" name="lastName" value={this.state.lastName} onChange={this.changeLastNameHandler} />

                                        <label htmlFor='emailId' className="form-label">Email address</label>
                                        <input id="emailHelp" placeholder="Email ID" type="email" className="form-control" name="emailId" value={this.state.emailId} onChange={this.changeEmailIdHandler} aria-describedby="emailHelp" />
                                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>

                                        <button className="btn btn-success" onClick={this.saveEmployee}>Submit</button>
                                        <Link className='btn btn-danger' to="/employees">Cancel</Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateEmployeeComponent;