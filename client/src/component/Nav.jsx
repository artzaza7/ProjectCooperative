import React from "react";
import './css/Nav.css'
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import NavDropdown from 'react-bootstrap/NavDropdown';
function NavCustom() {
    return (
        <nav className="navbar navbar-expand-sm navbar-light ">
            <div className="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
                <a className="navbar-brand" href="#" style={{ fontWeight: "bold", color: "#ffc107" }}>Self Finance Management</a>
                <ul className="navbar-nav mr-auto">
                    <Link to="/home" className="nav-link">DashBoard</Link>
                    <Link to="/alltransaction" className="nav-link">All Transaction</Link>
                </ul>
            </div>

            <div className="navbar-collapse collapse w-0 order-3 dual-collapse2">
                <ul className="navbar-nav ml-auto">
                    <NavDropdown title="Profile" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#">LogOut</NavDropdown.Item>


                    </NavDropdown>
                </ul>
            </div>
        </nav>
    )
}

export default NavCustom;
