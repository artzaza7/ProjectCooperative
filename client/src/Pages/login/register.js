import React, { useState } from "react";
import "./login.css";

import { useNavigate } from "react-router-dom";
import { Button, Image } from "react-bootstrap";
import login_image from "../../assets/images/login_image.png";
import login_image2 from "../../assets/images/logo.png";

// Import API
import { register } from "../../service/FunctionService";

function Register() {
  // Navigator
  const navigate = useNavigate();

  // Data for Register
  const [email, setEmail] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  async function handleSubmitSignUp() {
    // validate Password === ConfirmPassword ???
    if (password === confirmPassword) {
      // Valid
      var data = {
        "first_name": firstname,
        "last_name": lastname,
        "email": email,
        "pwd": password
      }
      try {
        const response = await register(data);
        // console.log(response);
        // Success
        console.log("sign up successful : " + response.message);
        navigate("/")

      } catch (error) {
        console.log(error.response.data.message);
        console.log("sign up not successful");
      }
    }
    else {
      // Invalid
      console.log("password !== confirmPassword");
      console.log("sign up not successful");
    }
  };
  return (
    <div className="body">
      <div className="box">
        <div className="row">
          <div className="col-6">
            <div className="container-logo-register">
              <div className="alignlogo">
                <Image src={login_image} className="loginLogo" />
                <Image src={login_image2} className="loginLogo2" />
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="Header">Sign Up</div>
            <form>
              <label htmlFor="formGroupExampleInput" className="text1">
                Email
              </label>
              <div className="form-outline mb-4">
                <input
                  type="email"
                  id="form2Example11"
                  className="form-control lable"
                  placeholder=""
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <label htmlFor="formGroupExampleInput2" className="text1">
                Firstname
              </label>
              <div className="form-outline mb-2">
                <input
                  type="text"
                  id="form2Example22"
                  className="form-control lable"
                  placeholder=""
                  onChange={(e) => setFirstname(e.target.value)}
                />
              </div>
              <label htmlFor="formGroupExampleInput3" className="text1">
                Lastname
              </label>
              <div className="form-outline mb-2">
                <input
                  type="text"
                  id="form2Example23"
                  className="form-control lable"
                  placeholder=""
                  onChange={(e) => setLastname(e.target.value)}
                />
              </div>
              <label htmlFor="formGroupExampleInput4" className="text1">
                Password
              </label>
              <div className="form-outline mb-2">
                <input
                  type="password"
                  id="form2Example24"
                  className="form-control lable"
                  placeholder=""
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <label htmlFor="formGroupExampleInput5" className="text1">
                Confirm Password
              </label>
              <div className="form-outline mb-2">
                <input
                  type="password"
                  id="form2Example25"
                  className="form-control lable"
                  placeholder=""
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </form>
              <Button className="button2" onClick={handleSubmitSignUp}>SIGN UP</Button>{" "}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
