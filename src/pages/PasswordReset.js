import { useEffect, useState } from "react";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import Center from "../components/utility/Center";

// API
import { useMutation, gql } from "@apollo/client";

// Global state
import { connect } from "react-redux";
import { Link } from "react-router-dom";

function PasswordReset(props) {
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState({});

  const PASSWORD_RESET = gql`
    mutation passwordReset(
      $token: String!
      $newPassword1: String!
      $newPassword2: String!
    ) {
      passwordReset(
        token: $token
        newPassword1: $newPassword1
        newPassword2: $newPassword2
      ) {
        success
        errors
      }
    }
  `;
  const [passwordReset, { loading, data }] = useMutation(PASSWORD_RESET);

  useEffect(() => {
    setSuccess(data && data.passwordReset && data.passwordReset.success);

    let new_password1_error =
      data &&
      data.passwordReset &&
      data.passwordReset.errors &&
      data.passwordReset.errors.newPassword1 &&
      data.passwordReset.errors.newPassword1.length &&
      data.passwordReset.errors.newPassword1[0].message;

    let new_password2_error =
      data &&
      data.passwordReset &&
      data.passwordReset.errors &&
      data.passwordReset.errors.newPassword2 &&
      data.passwordReset.errors.newPassword2.length &&
      data.passwordReset.errors.newPassword2[0].message;

    setError({
      password1: new_password1_error,
      password2: new_password2_error,
    });

  }, [data]);

  const HandleSubmit = (e) => {
    e.preventDefault();
    const token = props.match.params.token;
    passwordReset({
      variables: { token: token, newPassword1: password1, newPassword2: password2 },
    });
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} sm={8} md={6} lg={4}>
          <Center height="87vh">
            {success ? (
              <Card>
                <Card.Body>
                  <Card.Title>Password Successfully Reset</Card.Title>
                  <Card.Text>
                    Your password has now successfully been reset. You can login with new password.
                  </Card.Text>
                  <Card.Link as={Link} to="/login">
                    Continue to Login
                  </Card.Link>
                </Card.Body>
              </Card>
            ) : (
              <Form onSubmit={HandleSubmit}>
                <Form.Group controlId="formPassword1">
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    type="password"
                    required
                    placeholder="New Password"
                    value={password1}
                    onChange={(e) => setPassword1(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Text className="red">{error.password1}</Form.Text>
                </Form.Group>
                <Form.Group controlId="formPassword2">
                  <Form.Label>Confirm New Password</Form.Label>
                  <Form.Control
                    type="password"
                    required
                    placeholder="Confirm New Password"
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
                    loading ||
                    (data && data.passwordReset && data.passwordReset.success)
                  }
                >
                  {loading ? "Resetting..." : "Reset"}
                </Button>
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

export default connect(mapStateToProps)(PasswordReset);
