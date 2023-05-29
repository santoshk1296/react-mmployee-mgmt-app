import React from 'react';
import { Link } from "react-router-dom";
import MainNavigation from './MainNavigation.module.css';
//import Container from 'react-bootstrap/Container';
//import Nav from 'react-bootstrap/Nav';
//import Navbar from 'react-bootstrap/Navbar';

 //Old with Link
function HeaderComponent() {

    return (
        <div>
            <header className={MainNavigation.header}>
                <div className={MainNavigation.logo}>Employee Management</div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/employees">Employee List</Link>
                        </li>
                    </ul>

                </nav>
            </header>
        </div>
    );
}
    
   /*
   function HeaderComponent() {

    
    return (
            <Navbar bg="primary" variant="dark">
            <Container>
              <Nav className="me-auto">
                <Nav.Link to="/">Home</Nav.Link>
                <Nav.Link to="/employees">Employee List</Nav.Link>
              </Nav>
            </Container>
          </Navbar>
        );
}
*/

export default HeaderComponent;