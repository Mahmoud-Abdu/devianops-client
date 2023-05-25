import React from "react";
import { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { register } from "../services/authService";
import jwtDecode from "jwt-decode";

function Register({ onUpdate }) {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    try {
      const response = await register(user);
      const { data: _user, headers } = response;
      const token = headers["x-auth-token"];
      localStorage.setItem("token", token);
      onUpdate(token);
      // const decoded = jwtDecode(token);
      // console.log("user: ", _user);
      // console.log("Token: ", token);
      // console.log("decoded", decoded);
    } catch (err) {
      throw err;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegister();
    // console.log("user: ", user);
  };

  return (
    <Container>
      <Form
        style={{ height: "100vh" }}
        className="d-flex flex-column align-content-center justify-content-center flex-wrap"
        onSubmit={handleSubmit}
      >
        <Form.Control
          placeholder="User Name"
          name="username"
          value={user.username}
          type="text"
          className="w-50 m-2"
          onChange={handleChange}
          required
        ></Form.Control>
        <Form.Control
          placeholder="Email"
          name="email"
          value={user.email}
          type="email"
          className="w-50 m-2"
          onChange={handleChange}
          required
        ></Form.Control>
        <Form.Control
          placeholder="Password"
          name="password"
          value={user.password}
          type="password"
          className="w-50 m-2"
          onChange={handleChange}
          required
        ></Form.Control>
        <Button type="submit" className="m-2">
          Register
        </Button>
      </Form>
    </Container>
  );
}

export default Register;
