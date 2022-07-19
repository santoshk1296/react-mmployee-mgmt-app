import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';
import { Link } from "react-router-dom";

class ListEmployeeComponent extends Component {

    constructor(props){
        
        super(props)

        this.state = {
            employees: []
        }
    }

    componentDidMount(){

        EmployeeService.getEmployList().then((res) => {
            this.setState({employees: res.data});
        });
    }

    dleteEmployee(id){

        EmployeeService.deleteEmployee(id).then(res => {
            
            if(res?.status===200) {
                
                this.setState({employees: this.state.employees.filter(employee => employee.id !== id)});    

                console.log('employee Deleted');
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
    
    render() {
        return (
            <div>
                <h2 className='text-center'>Employee List</h2>
                    <Link className='btn btn-outline-warning' to="/add-employee">Add Employee</Link>
                <div className='empTbl'>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>Emp Id</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email Id</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                this.state.employees.map(
                                    employee =>
                                        <tr key={employee.id}>
                                            <td>{employee.id}</td>
                                            <td>{employee.firstName}</td>
                                            <td>{employee.lastName}</td>
                                            <td>{employee.emailId}</td>
                                            <td>
                                                <Link style={{marginRight: "-200px"}} className='btn btn-info' to={{
                                                                                    pathname:`/update-employee/${employee.id}`
                                                                                    }}>Update</Link>
                                            </td>
                                            <td>
                                                <button style={{marginLeft: "-90px"}} className='btn btn-danger' onClick={ () => this.dleteEmployee(employee.id)} >Delete</button>
                                            </td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default ListEmployeeComponent;