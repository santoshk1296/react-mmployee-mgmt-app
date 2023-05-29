//Old with Router
import './App.css';
import FooterComponent from './components/FooterComponent';
import HeaderComponent from './components/HeaderComponent';
import ListEmployeeComponent from './components/ListEmployeeComponent';
import {Route, Routes } from "react-router-dom";
import Home from './components/Home';
import React from 'react';


function App() {

   return (
    <div>
        <HeaderComponent />
        <div className="container">
          <Routes>
              <Route exact path="/"  element={<Home />} />
              <Route exact path="/employees" element={<ListEmployeeComponent />} />
          </Routes>
        </div>
        <FooterComponent />
    </div>
  );
}

export default App;

/*
import './App.css';
import FooterComponent from './components/FooterComponent';
import HeaderComponent from './components/HeaderComponent';
import ListEmployeeComponent from './components/ListEmployeeComponent';
import Home from './components/Home';
import CreateEmployeeComponent from './components/CreateEmployeeComponent';

function App() {

  let component

  switch (window.location.pathname) {
    case "/":
      component = <Home />;
      break
    case "/employees":
      component = <ListEmployeeComponent />;
      break
    case "/addEmplyee":
      component = <CreateEmployeeComponent />;
      break
    default:
      break
  }
  return (
    <div>
        <HeaderComponent />
        <div className="container">
          {component}
        </div>
        <FooterComponent />
    </div>
  );
}

export default App;
*/