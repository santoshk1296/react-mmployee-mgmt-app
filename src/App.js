import './App.css';
import FooterComponent from './components/FooterComponent';
import HeaderComponent from './components/HeaderComponent';
import ListEmployeeComponent from './components/ListEmployeeComponent';
import { BrowserRouter, Route, Routes} from "react-router-dom";
import Home from './components/Home';
import CreateEmployeeComponent from './components/CreateEmployeeComponent';
import UpdateEmployeeComponent from './components/UpdateEmployeeComponent';
import DeleteEmployeeComponent from './components/DeleteEmployeeComponent';

function App() {
  return (
    <div>
      <BrowserRouter>
        <HeaderComponent />
        <div className="container">
          <Routes>
              <Route exact path="/"  element={<Home />} />
              <Route exact path="/Home"  element={<Home />} />
              <Route exact path="/employees" element={<ListEmployeeComponent />} />
              <Route exact path="/add-employee" element={<CreateEmployeeComponent />} />
              <Route exact path="/update-employee/:id" element={<UpdateEmployeeComponent />} />
              <Route exact path="/delete-employee/:id" element={<DeleteEmployeeComponent />} />
          </Routes>
        </div>
        <FooterComponent />
      </BrowserRouter>
    </div>
  );
}

export default App;
