import React, { useState, useEffect } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";

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
    <>
      <div className="register-page">
        {loading && <Spinner />}
        <Form layout="vertical" onFinish={submitHandler}>
          <h1>Login Form</h1>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please enter your email!" }]}
          >
            <Input type="email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password!" }]}
          >
            <Input type="password" />
          </Form.Item>

          <div className="d-flex justify-content-between">
            <Link to="/register">Not a user? Click here to register</Link>
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default Login;
