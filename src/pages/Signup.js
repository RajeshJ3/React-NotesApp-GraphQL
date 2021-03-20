import { useEffect, useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Center from "../components/utility/Center";
import SignupSuccess from "../components/utility/SignupSuccess";

// API
import { useMutation, gql } from "@apollo/client";

// Global state
import { connect } from "react-redux";

function SignupPage(props) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState({});
  const [success, setSuccess] = useState(false);

  const LOGIN = gql`
    mutation register(
      $username: String!
      $email: String!
      $password1: String!
      $password2: String!
    ) {
      register(
        username: $username
        email: $email
        password1: $password1
        password2: $password2
      ) {
        success
        errors
      }
    }
  `;
  const [register, { loading, data }] = useMutation(LOGIN);

  useEffect(() => {    
    setSuccess(data && data.register && data.register.success);
    let username_error =
      data &&
      data.register &&
      data.register.errors &&
      data.register.errors.username &&
      data.register.errors.username.length &&
      data.register.errors.username[0].message;

    let password1_error =
      data &&
      data.register &&
      data.register.errors &&
      data.register.errors.password1 &&
      data.register.errors.password1.length &&
      data.register.errors.password1[0].message;

    let email_error =
      data &&
      data.register &&
      data.register.errors &&
      data.register.errors.email &&
      data.register.errors.email.length &&
      data.register.errors.email[0].message;

    let password2_error =
      data &&
      data.register &&
      data.register.errors &&
      data.register.errors.password2 &&
      data.register.errors.password2.length &&
      data.register.errors.password2[0].message;

    setError({
      username: username_error,
      email: email_error,
      password1: password1_error,
      password2: password2_error,
    });
  }, [data]);

  useEffect(() => {
    if (props.checkAuth.isAuthenticated) {
      window.location.replace("/");
    }
  }, [props.checkAuth]);

  const HandleSubmit = (e) => {
    e.preventDefault();
    register({ variables: { username, email, password1, password2 } });
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} sm={8} md={6} lg={4}>
          <Center height="87vh">
            {success ? (
              <SignupSuccess email={email} />
            ) : (
              <Form onSubmit={HandleSubmit} autoComplete="off">
                <Form.Group controlId="formUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Text className="red">{error.username}</Form.Text>
                </Form.Group>
                <Form.Group controlId="formEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    required
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Text className="red">{error.email}</Form.Text>
                </Form.Group>
                <Form.Group controlId="formPassword1">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    required
                    placeholder="Password"
                    value={password1}
                    onChange={(e) => setPassword1(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Text className="red">{error.password1}</Form.Text>
                </Form.Group>
                <Form.Group controlId="formPassword2">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    required
                    placeholder="Confirm Password"
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Text className="red">{error.password2}</Form.Text>
                </Form.Group>
                <Button
                  className="full-width"
                  variant="primary"
                  type="submit"
                  disabled={
                    loading || (data && data.register && data.register.success)
                  }
                >
                  {loading ? "Signing up..." : "Signup"}
                </Button>
                <Row className="justify-content-center mt-4 mb-4">
                  Already have an accout? &nbsp; <Link to="/login">Login</Link>
                </Row>
              </Form>
            )}
          </Center>
        </Col>
      </Row>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    checkAuth: state.setAuth,
  };
};

export default connect(mapStateToProps)(SignupPage);
