import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
function Home({ user }) {
  return (
    <Container
      className="align-items-center d-flex justify-content-around"
      style={{ height: "80vh" }}
    >
      {user && (
        <Link to="/monsters/form" className="m-2 btn btn-primary">
          Add New Monster
        </Link>
      )}

      {user && (
        <Link to="/quests/form" className="m-2 btn btn-primary">
          Add New Quest
        </Link>
      )}

      {!user && (
        <Link to="/register" className="m-2 btn btn-primary py-2 px-4">
          Register
        </Link>
      )}

      {!user && (
        <Link to="/login" className="m-2 btn btn-primary py-2 px-4">
          Login
        </Link>
      )}
    </Container>
  );
}

export default Home;
