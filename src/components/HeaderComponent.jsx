import React, { Component } from 'react';
import { Link } from "react-router-dom";

class HeaderComponent extends Component {
    
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        return (
            <div>
                <header>
                    <nav className="navbar navbar-expand-sm navbar-dark bg-primary">
                        <div className="collapse navbar-collapse" id="collapsibleNavId">
                            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                            <li className="nav-item">
                                    <Link className='btn btn-primary' to="/Home"><div className='nav-link'>Home</div></Link>
                                </li>
                                <li className="nav-item">
                                    <Link className='btn btn-primary' to="/employees"><div className='nav-link'>Employee List</div></Link>
                                </li>
                                <li className="nav-item">
                                <Link className='btn btn-primary' to="/add-employee"><div className='nav-link'>Add Employee</div></Link>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </header>
            </div>
        );
    }
}

export default HeaderComponent;