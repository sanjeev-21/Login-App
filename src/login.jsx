import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginComponent(props) {
    let navigate = useNavigate();
    const [ emailId, setEmailId ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ errMsg, setErrMsg ] = useState(false);
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const handleEmail = e => {
        setEmailId(e.target.value)
        setErrMsg(false)
    }
    const handlePassword = e => {
        setPassword(e.target.value);
        setErrMsg(false)
    }
    const clearInputFields = () => {
        setEmailId('');
        setPassword('')
    }
    const handleLogin = () =>{
        if(emailId.match(emailRegex) && password.length >= 8){
            const userData = {
                emailId,
                password
            };
            localStorage.setItem('loginInfo',JSON.stringify(userData));
            clearInputFields();            
            navigate('/home');
        } else{
            setErrMsg(true)
        }
    }
  return (
      <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-5 col-lg-5 col-xl-5">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="img-fluid"
              alt="Sample image"
            />
          </div>
          <div className="col-md-4 col-lg-4 col-xl-4 offset-xl-1">
            <form>
              <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                <p className="lead fw-normal mb-0 me-3 sign-in-text">Sign in</p>
              </div>

              <div className="form-outline mb-4">
                <label className="form-label" for="emailId">
                  Email address
                </label>
                <input
                  type="email"
                  id="emailId"
                  className="form-control form-control-lg"
                  onChange={handleEmail}
                  placeholder="Enter a valid email address"
                />
              </div>

              <div className="form-outline mb-3">
                <label className="form-label" for="password">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  onChange={handlePassword}
                  className="form-control form-control-lg"
                  placeholder="Enter password"
                />
                {errMsg && <p className="error-txt">Invalid Username / Password</p>}
              </div>
              <div className="row mt-5">
                <div className="col-sm-6 col-md-6 col-lg-6">
                  <a className="text-body">Forgot password?</a>
                </div>
                <div className="col-sm-6 col-md-6 col-lg-6">
                  <label
                    className="form-check-label"
                    for="signUp"
                    style={{ float: "right" }}
                  >
                    Sign Up
                  </label>
                </div>
              </div>

              <div className=" text-lg-start mt-4 pt-2">
                <button type="button" onClick={handleLogin} className="btn btn-primary btn-style">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
  );
}
