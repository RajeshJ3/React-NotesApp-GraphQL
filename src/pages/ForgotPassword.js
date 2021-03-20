import { useEffect, useState } from "react";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import Center from "../components/utility/Center";

// API
import { useMutation, gql } from "@apollo/client";

// Global state
import { connect } from "react-redux";
import { Link } from "react-router-dom";

function ForgotPassword(props) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const SEND_EMAIL = gql`
    mutation sendPasswordResetEmail($email: String!) {
      sendPasswordResetEmail(email: $email) {
        success
      }
    }
  `;
  const [sendPasswordResetEmail, { loading, data }] = useMutation(SEND_EMAIL);

  useEffect(() => {
    setSent(
      data && data.sendPasswordResetEmail && data.sendPasswordResetEmail.success
    );
  }, [data]);

  const HandleSubmit = (e) => {
    e.preventDefault();
    sendPasswordResetEmail({ variables: { email: email } });
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} sm={8} md={6} lg={4}>
          <Center height="87vh">
            {sent ? (
              <Card>
                <Card.Body>
                  <Card.Title>E-mail sent</Card.Title>
                  <Card.Text>
                    If the email you've entered is correct, you'll receive a password reset email shortly.
                  </Card.Text>
                  <Card.Link as={Link} to="/login">
                    Continue to Login 
                  </Card.Link>
                </Card.Body>
              </Card>
            ) : (
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
                <Button
                  className="full-width"
                  variant="primary"
                  type="submit"
                  disabled={
                    loading ||
                    (data &&
                      data.sendPasswordResetEmail &&
                      data.sendPasswordResetEmail.success)
                  }
                >
                  {loading ? "Sending..." : "Send"}
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

export default connect(mapStateToProps)(ForgotPassword);
