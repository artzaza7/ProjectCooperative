import React, { useState } from "react";
import "./login.css";
import { Link } from "react-router-dom";
import { Button, Image } from "react-bootstrap";
import login_image from "../../assets/images/login_image.png";
import login_image2 from "../../assets/images/logo.png";
import { useNavigate } from "react-router-dom";

// Import API
import { login } from "../../service/FunctionService";

function Login() {
  const navigate = useNavigate();

  // Data for Login
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmitSignIn() {
    var data = {
      "email": email,
      "pwd": password
    }
    try {
      const response = await login(data);
      // console.log(response);
      // Success
      console.log("sign in successful : " + response.message);
      localStorage.setItem('token', response.data);
      navigate("/home")

    } catch (error) {
      console.log(error.response.data.message);
      console.log("sign in not successful");
    }

  };
  return (
    <div className="body">
      <div className="box">
        <div className="row">
          <div className="col-6">
            <div className="container-logo">
              <div className="alignlogo">
                <Image src={login_image} className="loginLogo" />
                <Image src={login_image2} className="loginLogo2" />
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="Header">Sign In</div>
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
                />
              </div>
              <label htmlFor="formGroupExampleInput2" className="text1">
                Password
              </label>
              <div className="form-outline mb-2">
                <input
                  type="password"
                  id="form2Example22"
                  className="form-control lable"
                  placeholder=""
                />
              </div>
            </form>
            <a href="#!" className="text2 text-muted">
              Forgot password?
            </a>
            <br />

            <Link to="/home">
              <Button variant="primary" className="button">
                SIGN IN
              </Button>{" "}
            </Link>
            <div className="text3">OR</div>
            <Link to="/register">
              <Button className="button">SIGN UP</Button>{" "}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
