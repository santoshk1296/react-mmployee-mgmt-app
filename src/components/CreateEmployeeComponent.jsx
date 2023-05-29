//import React, { useState } from 'react';
import React, { useRef } from 'react';
import EmployeeService from '../services/EmployeeService';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

const CreateEmployeeComponent = (props) => {

  //This code to grab the input from user with useState hook
  /*
  const [firstName, setFistName] = useState("");
  const [lastName, setlastname] = useState("");
  const [emailId, setEmailId] = useState("");
  
  console.log('Inside CreateEmployeeComponent');
  
   const saveEmployee = (event) => {
          event.preventDefault();
  
          let employee = { firstName: firstName, lastName: lastName, emailId: emailId};
  
          console.log('employee => ' + JSON.stringify(employee));
  
          EmployeeService.createEmployee(employee).then(res => {
              
              if(res?.status===200) {
                  console.log('employee created');
                  console.log('Response Generated: '+JSON.stringify(res.data));
                  //window.location = "/employees";
                  props.onBindDataAddEmp(res.data);
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
  */

  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailIdRef = useRef();

  const saveEmployee = (event) => {
    
    event.preventDefault();

    const firstName = firstNameRef.current.value;
    const lastName = lastNameRef.current.value;
    const emailId = emailIdRef.current.value;

    const employee = { firstName: firstName, lastName: lastName, emailId: emailId };

    console.log('employee => ' + JSON.stringify(employee));

    EmployeeService.createEmployee(employee).then(res => {

      if (res?.status === 200) {
        console.log('employee created');
        console.log('Response Generated: ' + JSON.stringify(res.data));
        //window.location = "/employees";
        props.onBindDataAddEmp(res.data);
      }
    })
      .catch(error => {
        if (error.response) {
          console.log('Error=>' + error.response.data.details);
          alert(error.response.data.details);
        }
      });

  }

  const handleClose = () => {

    props.onCloseModal();

  }

  return (

    <>
      <Modal show={props.IsModalOpened}>
        <Modal.Header>
          <Modal.Title>Create Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="firstName">
              <Form.Label>First Name</Form.Label>
              {/* <Form.Control type="text" value={firstName} onChange={changeFirstNameHandler} autoFocus /> */}
              <Form.Control type="text" ref={firstNameRef} autoFocus />
            </Form.Group>
            <Form.Group className="mb-3" controlId="lastName">
              <Form.Label>Last Name</Form.Label>
              {/* <Form.Control type="text" value={lastName} onChange={changeLastNameHandler} /> */}
              <Form.Control type="text" ref={lastNameRef} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email address</Form.Label>
              {/* <Form.Control type="email" value={emailId} onChange={changeEmailIdHandler} /> */}
              <Form.Control ref={emailIdRef} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={saveEmployee}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreateEmployeeComponent;