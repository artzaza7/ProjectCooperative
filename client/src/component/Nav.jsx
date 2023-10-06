import React from "react";
import './css/Nav.css'
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

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
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Profile
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <a className="dropdown-item" href="#">Action</a>
                            <a className="dropdown-item" href="#">Another action</a>
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item" href="#">Something else here</a>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default NavCustom;
