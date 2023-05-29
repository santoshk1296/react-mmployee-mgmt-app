import React, { useEffect } from 'react';
import EmployeeService from '../services/EmployeeService';
//import {useNavigate} from "react-router-dom";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import UpdateEmployeeComponent from './UpdateEmployeeComponent';
import CreateEmployeeComponent from './CreateEmployeeComponent';


const columns = [
    { id: 'empid', label: 'Emp Id', minWidth: 170 },
    { id: 'firstname', label: 'First Name', minWidth: 100 },
    { id: 'lastname', label: 'Last Name', minWidth: 100 },
    { id: 'emailid', label: 'Email Id', minWidth: 100 },
    { id: 'action', label: 'Actions', minWidth: 100 }
];


const ListEmployeeComponent = () => {


    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [employees, setEmployees] = React.useState([]);
    const [empid, setEmpid] = React.useState('');
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [createEmpScr, setcreateEmpScr] = React.useState(false);

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = () => {

        EmployeeService.getEmployList().then((res) => {
            setEmployees(res.data);
        });
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const dleteEmployee = (id, e) => {

        e.preventDefault();

        console.log('Inside dleteEmployee =>' + id);

        EmployeeService.deleteEmployee(id).then(res => {

            console.log('res.status =>' + res?.status);

            if (res?.status === 200) {

                console.log('employee Deleted');
                const newemployeelist =  employees.filter((empl) =>{
                    return empl.id !== id;
                });
                
                setEmployees(newemployeelist);
                //navigate('/employees');
                window.location = "/employees";
            }
        })
            .catch(error => {
                if (error.response) {
                    console.log('Error=>' + error.response.data.details);
                    alert(error.response.data.details);
                }
            });
    }

    function handleCloseModal() {
        setIsOpen(false);
      }
      
    function bindChangedData(event, empid, data){

        console.log('Inside bindChangedData');
        console.log('Employee Data: ' + JSON.stringify(data));
        console.log('Employee name: ' + data.firstName);
        //setEmployees(data);
        const newState = employees.map(obj => {
            // 👇️ if id equals 2, update country property
            if (obj.id === empid) {
                return { ...obj, firstName: data.firstName, lastName: data.lastName, emailId: data.emailId };
            }

            // 👇️ otherwise return object as is
            return obj;
        });

        setEmployees(newState);
        setIsOpen(false);

    } 
    
    function onBindDataAddEmp(data){

        console.log('Inside onBindDataAddEmp');
        console.log('Employee Data: ' + JSON.stringify(data));
        console.log('Employee name: ' + data.firstName);
       
        setEmployees(current => [...employees, {id: data.id, firstName: data.firstName, lastName: data.lastName, emailId: data.emailId}]);
        setIsOpen(false);

    }  

    const updateEmployee = (e, id) => {
        
        e.preventDefault();
       console.log('Inside updateEmployee Function id: '+id)
       setcreateEmpScr(false);
       setEmpid(id);
       console.log('empid: '+empid)
       setIsOpen(true);
       

    }

    function AddEmployee(){
        setcreateEmpScr(true);
        setIsOpen(true);
    }

    return (
        <><Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="Employee List">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth, fontSize: 15, color: 'Highlight', fontWeight: 'bold' }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {employees
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map(employee => <TableRow hover role="checkbox" tabIndex={-1} key={employee.id}>

                                <TableCell>{employee.id}</TableCell>
                                <TableCell>{employee.firstName}</TableCell>
                                <TableCell>{employee.lastName}</TableCell>
                                <TableCell>{employee.emailId}</TableCell>
                                <TableCell>
                                    <IconButton aria-label="edit" color="primary" onClick={(e) => (updateEmployee(e, employee.id))}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton aria-label="delete" color="warning" onClick={(e) => (dleteEmployee(employee.id, e))}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                            )}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 15]}
                component="div"
                count={employees.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage} />
        </Paper>
        {modalIsOpen && !createEmpScr && <UpdateEmployeeComponent 
                         empId={empid} 
                         onCloseModal={handleCloseModal}
                         onBindDataFromChield={bindChangedData} 
                         IsModalOpened={modalIsOpen}
                         />}
        <button className='btn btn-primary' onClick={AddEmployee}>Add Employee</button>
        {modalIsOpen && createEmpScr && <CreateEmployeeComponent 
                         onCloseModal={handleCloseModal}
                         onBindDataAddEmp={onBindDataAddEmp} 
                         IsModalOpened={modalIsOpen}
                         />}
        </>
    );
}

export default ListEmployeeComponent;