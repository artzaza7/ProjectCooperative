import React from "react";
import "./login.css";

import { Link } from "react-router-dom";
import { Button, Image, Col, Row, Card } from "react-bootstrap";
import login_image from "../../assets/images/login_image.png";
import login_image2 from "../../assets/images/logo.png";

function Register() {
  return (
    <body>
      <div className="body">
        <div class="box">
          <div class="row">
            <div class="col-6">
              <div class="container-logo-register">
                <div className="alignlogo">
                  <Image src={login_image} className="loginLogo" />
                  <Image src={login_image2} className="loginLogo2" />
                </div>
              </div>
            </div>
            <div class="col-6">
              <div className="Header">Sign Up</div>
              <form>
                <label for="formGroupExampleInput" className="text1">
                  Name
                </label>
                <div class="form-outline mb-4">
                  <input
                    type="text"
                    id="form2Example11"
                    class="form-control"
                    placeholder=""
                    className="lable"
                  />
                </div>
                <label for="formGroupExampleInput2" className="text1">
                  Email
                </label>
                <div class="form-outline mb-2">
                  <input
                    type="email"
                    id="form2Example22"
                    class="form-control"
                    placeholder=""
                    className="lable"
                  />
                </div>
                <label for="formGroupExampleInput2" className="text1">
                  UserName
                </label>
                <div class="form-outline mb-2">
                  <input
                    type="text"
                    id="form2Example22"
                    class="form-control"
                    placeholder=""
                    className="lable"
                  />
                </div>
                <label for="formGroupExampleInput2" className="text1">
                  Password
                </label>
                <div class="form-outline mb-2">
                  <input
                    type="password"
                    id="form2Example22"
                    class="form-control"
                    placeholder=""
                    className="lable"
                  />
                </div>
                <label for="formGroupExampleInput2" className="text1">
                  Confirm Password
                </label>
                <div class="form-outline mb-2">
                  <input
                    type="password"
                    id="form2Example22"
                    class="form-control"
                    placeholder=""
                    className="lable"
                  />
                </div>
              </form>

              <Link to="/">
                <Button className="button2">SIGN UP</Button>{" "}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </body>
  );
}
export default Register;
