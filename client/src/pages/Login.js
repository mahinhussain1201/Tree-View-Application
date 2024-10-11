import React, { useState, useEffect } from "react";
import { message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox
} from 'mdb-react-ui-kit';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Form submit handler
  const submitHandler = async (values) => {
    try {
      setLoading(true);
      const { data } = await axios.post("http://localhost:8080/api/users/login", values);
      setLoading(false);
      message.success("Login successful");

      // Store the user data and token in localStorage (assuming backend sends a token)
      localStorage.setItem(
        "user",
        JSON.stringify({ ...data.user, token: data.token }) // Store token if available
      );
      navigate("/");
    } catch (error) {
      setLoading(false);
      message.error("Something went wrong. Please try again.");
    }
  };

  // Prevent logged-in users from accessing the login page
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user && user.token) {
      navigate("/"); 
    }
  }, [navigate]);

  return (
    <MDBContainer fluid className='p-4 background-radial-gradient overflow-hidden'>
      <MDBRow>
        <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>
          <h1 className="my-5 display-3 fw-bold ls-tight px-3" style={{color: 'hsl(218, 81%, 95%)'}}>
            Welcome Back! <br />
            <span style={{color: 'hsl(218, 81%, 75%)'}}>Please log in to continue</span>
          </h1>
        </MDBCol>

        <MDBCol md='6' className='position-relative'>
          <MDBCard className='my-5 bg-glass'>
            <MDBCardBody className='p-5'>
              {loading && <Spinner />}
              
              <MDBInput wrapperClass='mb-4' label='Email' id='email' type='email'/>
              <MDBInput wrapperClass='mb-4' label='Password' id='password' type='password'/>

              <div className='d-flex justify-content-between mx-3 mb-4'>
                {/* <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' /> */}
                <Link to="/register">Not a user? Register</Link>
              </div>

              <MDBBtn className='w-100 mb-4' size='md' onClick={() => submitHandler({ email: document.getElementById('email').value, password: document.getElementById('password').value })}>Login</MDBBtn>

            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Login;
