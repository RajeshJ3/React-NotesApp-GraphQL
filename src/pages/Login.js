import { useEffect, useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Center from "../components/utility/Center";

// API
import { useMutation, gql } from "@apollo/client";

// Global state
import { connect } from "react-redux";

function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});

  const LOGIN = gql`
    mutation ObtainToken($email: String!, $password: String!) {
      obtainToken(email: $email, password: $password) {
        success
        token
        refreshToken
        user {
          pk
          username
          verified
        }
        errors
      }
    }
  `;
  const [obtainToken, { loading, data }] = useMutation(LOGIN);

  useEffect(() => {
    const token = data && data.obtainToken && data.obtainToken.token;
    const refreshToken =
      data && data.obtainToken && data.obtainToken.refreshToken;
    const user = data && data.obtainToken && data.obtainToken.user;

    if (token && refreshToken && user) {
      localStorage.setItem("token", token);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("user", JSON.stringify(user));
      window.location.replace("/");
    }

    let credential_error =
      data &&
      data.obtainToken &&
      data.obtainToken.errors &&
      data.obtainToken.errors.nonFieldErrors &&
      data.obtainToken.errors.nonFieldErrors.length &&
      data.obtainToken.errors.nonFieldErrors[0].message;
      
    setError({ error: credential_error });
  }, [data]);

  useEffect(() => {
    if (props.checkAuth.isAuthenticated) {
      window.location.replace("/");
    }
  }, [props.checkAuth]);

  const HandleSubmit = (e) => {
    e.preventDefault();
    obtainToken({ variables: { email, password } });
  };
  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} sm={8} md={6} lg={4}>
          <Center height="87vh">
            <Form onSubmit={HandleSubmit}>
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
              <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  required
                  placeholder="Password"
                  value={password}
                  isValid={false}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Text className="red">{error.error}</Form.Text>
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Text className="text-muted">
                  <Link to="/login/forgot-password">Forget password</Link>
                </Form.Text>
              </Form.Group>
              <Button
                className="full-width"
                variant="primary"
                type="submit"
                disabled={
                  loading ||
                  (data && data.obtainToken && data.obtainToken.success)
                }
              >
                {loading ? "Loading..." : "Login"}
              </Button>
              <Row className="justify-content-center mt-4 mb-4">
                Don't have an accout? &nbsp; <Link to="/signup">Sign Up</Link>
              </Row>
            </Form>
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

export default connect(mapStateToProps)(LoginPage);
