import axios from 'axios';

//const EMP_BASE_URL = "http://localhost:8080/emp-api/v1/employees";
//const EMP_BASE_URL = "http://192.168.0.159:31110/emp-api/v1/employees"; //Kubernetes cluster url on Macbook CentOs VMware
const EMP_BASE_URL = "http://20.124.43.199:5000/emp-api/v1/employees"; //Kubernetes cluster Azure

class EmployeeService {
  
    getEmployList(){

        return axios.get(EMP_BASE_URL);

    }

    createEmployee(employee) {

        return axios.post(EMP_BASE_URL, employee);

    }

    getEmployeeById(employeeId){

        return axios.get(EMP_BASE_URL + '/' + employeeId);

    }

    updateEmployeeById(employee, employeeId){

        return axios.put(EMP_BASE_URL+'/'+employeeId, employee);
    }

    deleteEmployee(employeeId) {

        return axios.delete(EMP_BASE_URL + '/' + employeeId);
    }
}

export default new EmployeeService();