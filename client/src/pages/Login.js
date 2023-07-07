import React, { useState, useEffect } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCardFooter,
  MDBValidation,
  MDBBtn,
  MDBIcon,
  MDBSpinner,
  MDBValidationItem
} from "mdb-react-ui-kit";

import { Link, useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { login } from "../redux/features/authSlice";
import { GoogleLogin } from "react-google-login";
import { googleSignIn } from "../redux/features/authSlice";

const initialState = {
    email: "",
    password: "",
  }; 
const Login = () => {
    const [formValue, setFormValue ] = useState(initialState);
    const { loading, error } = useSelector((state) => ({ ...state.auth }));
    const { email, password } = formValue;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        error && toast.error(error);
      }, [error]);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (email && password) {
          dispatch(login({ formValue, navigate, toast }));
        }
      };
    const onInputChange = (e) => {
        let { name, value } = e.target;
        setFormValue({ ...formValue, [name]: value });
       };
    const googleSuccess = (resp) => {
        const email = resp?.profileObj?.email;
        const name = resp?.profileObj?.name;
        const token = resp?.tokenId;
        const googleId = resp?.googleId;
        const result = { email, name, token, googleId };
        dispatch(googleSignIn({ result, navigate, toast }));
      };
    const googleFailure = (error) => {
        toast.error(error);
      };
    return  (
        <div
          style={{
            margin: "auto",
            padding: "15px",
            maxWidth: "450px",
            alignContent: "center",
            marginTop: "120px",
          }}>
          <MDBCard alignment="center">
          <MDBIcon far icon="user-circle" />
            <h5>Sign In</h5>
            <MDBCardBody>
              <MDBValidation onSubmit={handleSubmit} noValidate className="row g-3">
                <MDBValidationItem className='col-md-12' feedback='Please enter Email.' invalid>
                 <MDBInput
                    label="Email"
                    type="email"
                    value={email}
                    name="email"
                    onChange={onInputChange}
                    required
                  />
                  </MDBValidationItem>
                  <MDBValidationItem className='col-md-12' feedback='Please enter password' invalid>
                  <MDBInput
                    label="Password"
                    type="password"
                    value={password}
                    name="password"
                    onChange={onInputChange}
                    required
                    validation="Please provide your password"
                  />
                </MDBValidationItem>
                <div className="col-12">
              <MDBBtn style={{ width: "100%" }} className="mt-2">
               {loading && (
                  <MDBSpinner
                    size="sm"
                    role="status"
                    tag="span"
                    className="me-2"
                  />
                )}
                Login
              </MDBBtn>
            </div>
          </MDBValidation>
          <br />
          <GoogleLogin
            clientId="793682692655-l4dp0f8s9mb2l32djbfanc8peu4i2er4.apps.googleusercontent.com"
            render={(renderProps) => (
              <MDBBtn
                style={{ width: "100%" }}
                color="danger"
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                <MDBIcon className="me-2" fab icon="google" /> Google Sign In </MDBBtn>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiepolicy="single_host_origin"
          />
          </MDBCardBody>
          <MDBCardFooter>
          <Link to="/register">
            <p>Don't have an account ? Sign Up</p>
          </Link>
          </MDBCardFooter>
      </MDBCard>
    </div>
    );
};

export default Login;