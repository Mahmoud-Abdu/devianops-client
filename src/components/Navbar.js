import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, NavLink } from "react-router-dom";
import Logout from "./Logout";

function NavBar({ user, onUpdate }) {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Link className="navbar-brand" to="/">
          Devianops
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink className="nav-link" to="/">
              Home
            </NavLink>
            {user && (
              <NavLink className="nav-link" to="/quests">
                Quests
              </NavLink>
            )}
            {user && (
              <NavLink className="nav-link" to="/monsters">
                Monsters
              </NavLink>
            )}

            {user && <Logout onUpdate={onUpdate} />}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
