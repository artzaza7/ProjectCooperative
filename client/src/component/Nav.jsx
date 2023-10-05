import React from "react";
import './css/Nav.css'
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

function NavCustom() {
    return (

        <nav class="navbar navbar-expand-sm navbar-light ">
            <div class="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">

                <a class="navbar-brand" href="#" style={{ fontWeight: "bold", color: "#ffc107" }}>Self Finance Management</a>

                <ul class="navbar-nav mr-auto">
                    < Link to="/home" class="nav-link">DashBoard</Link>
                    < Link to="/alltransaction" class="nav-link">All Transaction</Link>

                </ul>
            </div>

            <div class="navbar-collapse collapse w-0 order-3 dual-collapse2">
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Profile
                        </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <a class="dropdown-item" href="#">Action</a>
                            <a class="dropdown-item" href="#">Another action</a>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item" href="#">Something else here</a>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>


    )
}


export default NavCustom;