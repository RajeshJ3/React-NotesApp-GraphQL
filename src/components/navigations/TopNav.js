import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

// Global state
import { connect } from "react-redux";

function TopNav(props) {
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("refreshToken");
    window.location.replace("/login");
  };

  return (
    <Navbar bg="light" expand="lg" style={{ zIndex:"1" }}>
      <Container>
        <Navbar.Brand as={Link} to="/">
          React GraphQL
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            {props.checkAuth.isAuthenticated ? (
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            ) : (
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

const mapStateToProps = (state) => {
  return {
    checkAuth: state.setAuth,
  };
};

export default connect(mapStateToProps)(TopNav);
