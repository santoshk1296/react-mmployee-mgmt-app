import React, { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import EmployeeService from '../services/EmployeeService';

const  UpdateEmployeeComponent = () => {

    //const [employee, setemployeeData] = useState([]);
    const [firstName, setFistName] = useState("");
    const [lastName, setlastname] = useState("");
    const [emailId, setEmailId] = useState("");

    const { id } = useParams();
    
    const fetchData = () => { 
 
        console.log('id => ' + id);

        EmployeeService.getEmployeeById(id).then(res => {
            
            if(res?.status===200) {
                
                //setemployeeData(res.data);
                setFistName(res.data.firstName);
                setlastname(res.data.lastName);
                setEmailId(res.data.emailId);

                //console.log('employee Fetched=>'+JSON.stringify(employee));
               
            }    
        })
        .catch(error => {
            if (error.response) {
                console.log('Error=>'+error.response.data.details);
                alert(error.response.data.details);
            }
        });
    }

    const updateEmployee = (event) => {

        event.preventDefault();

        let employee = { firstName, lastName, emailId};

        console.log('employee => ' + JSON.stringify(employee));
        console.log('id => ' + id);

        EmployeeService.updateEmployeeById(employee, id).then(res => {
            
            if(res?.status===200) {

                console.log('employee updated');
                
                setFistName("");
                setlastname("");
                setEmailId("");
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

    const changeFirstNameHandler = (event) => {

        setFistName(event.target.value);
    }

    const changeLastNameHandler = (event) => {

        setlastname(event.target.value);
    }
    
    const changeEmailIdHandler = (event) => {
        setEmailId(event.target.value);
    }

    useEffect(() => {
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [])


    return (
        <div>
            <div className='container'>
                <div className='row'>
                    <div className='card col-md-6 offset-md-3 offset-md-3'>
                        <h3 className='text-center'>Update Employee</h3>
                        <div className='card-body'>
                            <form>
                                <div className='form-control'>
                                    <label htmlFor='firstName' className="form-label">First Name</label>
                                    <input placeholder='First Name' className="form-control" name='firstName' value={firstName} onChange={changeFirstNameHandler}/>

                                    <label htmlFor='lastName' className="form-label">Last Name</label>
                                    <input placeholder="Last Name" className="form-control" name="lastName" value={lastName} onChange={changeLastNameHandler}/>

                                    <label htmlFor='emailId' className="form-label">Email address</label>
                                    <input id="emailHelp" placeholder="Email ID" type="email" className="form-control" name="emailId" value={emailId} aria-describedby="emailHelp" onChange={changeEmailIdHandler}/>
                                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>

                                    <button className="btn btn-success" onClick={updateEmployee}>Update</button>
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

export default UpdateEmployeeComponent;