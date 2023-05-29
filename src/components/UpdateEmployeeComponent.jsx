import React, { useEffect, useState } from 'react';
//import { useParams } from "react-router-dom";
import EmployeeService from '../services/EmployeeService';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
//import ListEmployeeComponent from './ListEmployeeComponent';

const  UpdateEmployeeComponent = (props) => {

    const [firstName, setFistName] = useState("");
    const [lastName, setlastname] = useState("");
    const [emailId, setEmailId] = useState("");
    let id = '';
    id = props.empId;

    console.log('Inside UpdateEmployeeComponent empdid: '+props.empId);

    const handleClose = () => {
        
        props.onCloseModal();

    }

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
                //window.location = "/employees";
                props.onBindDataFromChield(event, id, employee);
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
       
        <>
        <Modal show={props.IsModalOpened} onHide={handleClose}>
          <Modal.Header>
            <Modal.Title>Update Employee</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
            <Form.Group className="mb-3" controlId="firstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control type="text" value={firstName} onChange={changeFirstNameHandler} autoFocus/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="lastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control type="text" value={lastName} onChange={changeLastNameHandler}/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" value={emailId} onChange={changeEmailIdHandler}/>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handleClose}>
              Close
            </Button>
            <Button variant="success" onClick={updateEmployee}>
              Update
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
}

export default UpdateEmployeeComponent;