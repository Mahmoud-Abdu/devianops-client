import React from "react";
import { Container, Form, Button } from "react-bootstrap";
import { Navigate, Link } from "react-router-dom";
function Home(props) {
  return (
    <Container
      className="align-items-center d-flex"
      style={{ height: "100vh" }}
    >
      <Form className="w-100 align-items-end d-flex" style={{justifyContent:"space-around"}}>
        <Form.Group>
           <Link to='/quests/form' className="m-2 btn btn-primary">
            Add New Quest
          </Link>
        </Form.Group>
        <Form.Group>
            <Link to='/monsters/form' className="m-2 btn btn-primary">
                Add New Monster
            </Link>
        </Form.Group>
      </Form>
    </Container>
  );
}

export default Home;
