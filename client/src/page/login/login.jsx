import React from "react";
import './login.css'

import { Link } from 'react-router-dom';
import { Button, Image, Col, Row, Card } from 'react-bootstrap'
import login_image from '../../assets/images/login_image.png';
import login_image2 from '../../assets/images/logo.png';
function Login() {
    return (
        <body>
            <div className="body">
                <div class="container-custom">
                    <div class="row">
                        <div class="col-6">
                            <div class="container-logo">
                                <div className="alignlogo">
                                    <Image src={login_image} className="loginLogo" />
                                    <Image src={login_image2} className="loginLogo2" />
                                </div>

                            </div>
                        </div>
                        <div class="col-6">
                            <div className="Header" >Sign In</div>
                            <form>
                                <label for="formGroupExampleInput" className="text1" >Username</label>
                                <div class="form-outline mb-4">
                                    <input type="email" id="form2Example11" class="form-control"
                                        placeholder="" className="lable" />

                                </div>
                                <label for="formGroupExampleInput2" className="text1">Password</label>
                                <div class="form-outline mb-2">
                                    <input type="password" id="form2Example22" class="form-control" placeholder="" className="lable" />
                                </div>
                            </form>
                            <a class="text-muted" href="#!" className="text2">Forgot password?</a><br />

                            <Link to="/home">
                                <Button variant="primary" className="button">SIGN IN</Button>{' '}
                            </Link>
                            <div className="text3">OR</div>
                            <Link to="/register">
                                <Button className="button">SIGN UP</Button>{' '}
                            </Link>

                        </div>
                    </div>

                </div>


            </div>
        </body>

    )
}
export default Login