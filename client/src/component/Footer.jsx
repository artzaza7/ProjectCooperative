import React from "react";
import './css/Nav.css'
import 'bootstrap/dist/css/bootstrap.css';

function Footer() {
    return (
        <div className="font">


            <div className="container mt-auto " >
                <footer className="py-3 my-4">
                    <ul className="nav justify-content-center border-bottom pb-3 mb-3">
                        <li className="nav-item"><a href="/home" className="nav-link px-2 text-muted">DashBoard</a></li>
                        <li className="nav-item"><a href="/alltransaction" className="nav-link px-2 text-muted">All Transaction</a></li>

                    </ul>
                    <p className="text-center text-muted">Self Finance Management</p>
                </footer>
            </div >
        </div>

    )
}


export default Footer;