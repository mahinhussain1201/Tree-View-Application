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
} from "mdb-react-ui-kit";
import Footer from "../components/Footer";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const submitHandler = async () => {
    const values = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
    };

    try {
      setLoading(true);
      await axios.post("https://tree-view-application.onrender.com/api/users/register", values);
      message.success("Registration Successful");
      setLoading(false);
      navigate("/login");
    } catch (error) {
      setLoading(false);
      message.error("Something went wrong");
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user && user.token) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <>
    <MDBContainer
      fluid
      className="p-4 background-radial-gradient overflow-hidden"
    >
      <MDBRow>
        <MDBCol
          md="6"
          className="text-center text-md-start d-flex flex-column justify-content-center"
        >
          <h1
            className="my-5 display-3 fw-bold ls-tight px-3"
            style={{ color: "hsl(218, 81%, 95%)" }}
          >
            Join Us Today! <br />
            <span style={{ color: "hsl(218, 81%, 45%)" }}>
              Create an Account
            </span>
          </h1>
        </MDBCol>

        <MDBCol md="6" className="position-relative">
          <MDBCard className="my-5 bg-glass" style={{ borderRadius: "40px" }}>
            <MDBCardBody className="p-5">
              {loading && <Spinner />}

              <MDBInput
                wrapperClass="mb-4"
                label="Name"
                id="name"
                type="text"
                style={{ borderRadius: "40px" }}
              />
              <MDBInput
                wrapperClass="mb-4"
                label="Email"
                id="email"
                type="email"
                style={{ borderRadius: "40px" }}
              />
              <MDBInput
                wrapperClass="mb-4"
                label="Password"
                id="password"
                type="password"
                style={{ borderRadius: "40px" }}
              />

              <div className="d-flex justify-content-center mb-4"></div>

              <MDBBtn
                className="w-100 mb-4"
                size="md"
                onClick={submitHandler}
                style={{
                  backgroundColor: "hsl(218, 81%, 45%)",
                  borderRadius: "40px",
                }}
              >
                Register
              </MDBBtn>

              <div className="text-center">
                <Link to="/login" style={{ color: "hsl(218, 81%, 45%)" }}>
                  Already Registered? Click Here to Login
                </Link>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
    <Footer/></>
  );
};

export default Register;
