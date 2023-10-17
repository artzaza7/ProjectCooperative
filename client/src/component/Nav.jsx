import React from "react";
import './css/Nav.css'
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from "react-router-dom";

function NavCustom() {
    // Navigator
    const navigate = useNavigate();

    function handleLogOut() {
        console.log("LOGOUT")
        localStorage.removeItem("token")
        navigate("/")
    }

    return (
        <nav className="navbar navbar-expand-sm navbar-light ">
            <div className="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
                <a className="navbar-brand" href="#" style={{ fontWeight: "bold", color: "#ffc107", fontSize: "1.7rem" }}>Self Finance Management</a>
                <ul className="navbar-nav mr-auto" style={{ fontWeight: "", fontSize: "1.3rem" }}>
                    <Link to="/home" className="nav-link">DashBoard</Link>
                    <Link to="/alltransaction" className="nav-link">All Transaction</Link>
                </ul>
            </div>

            <div className="navbar-collapse collapse w-0 order-3 dual-collapse2" style={{ fontSize: "1.3rem" }}>
                <ul className="navbar-nav ml-auto">
                    <NavDropdown title="Profile" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#" onClick={handleLogOut}>LogOut</NavDropdown.Item>
                    </NavDropdown>
                </ul>
            </div>
        </nav>
    )
}

export default NavCustom;
