import { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { login } from "../services/authService";
import { useNavigate } from "react-router-dom";

function Login({ onUpdate }) {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    const token = await login(user);
    onUpdate(token);
    navigate("/");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <Container>
      <Form
        style={{ height: "100vh" }}
        className="d-flex flex-column align-content-center justify-content-center flex-wrap"
        onSubmit={handleSubmit}
      >
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
          Login
        </Button>
      </Form>
    </Container>
  );
}

export default Login;
