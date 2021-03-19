import { useEffect, useState } from "react";
import { Card, Container, Row, Col, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import Center from "../components/utility/Center";

// API
import { useMutation, gql } from "@apollo/client";

export default function VerifyAccount(props) {
  const [success, setSuccess] = useState(false);

  const VERIFY = gql`
    mutation verifyAccount($token: String!) {
      verifyAccount(token: $token) {
        success
        errors
      }
    }
  `;
  const [verifyAccount, { data }] = useMutation(VERIFY);

  useEffect(() => {
    const token = props.match.params.token;
    verifyAccount({ variables: { token: token } });
  }, [props, verifyAccount]);

  useEffect(() => {
    setSuccess(data && data.verifyAccount && data.verifyAccount.success);
  }, [data]);

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} sm={8} md={6} lg={4}>
          <Center height="87vh">
            <Card>
              <Card.Body>
                <Card.Title>Activating Account</Card.Title>
                {!success ? (
                  <center>
                    <br />
                    <br />
                    <Spinner animation="border" variant="success" />
                    <br />
                    <br />
                  </center>
                ) : (
                  <>
                    <center>
                      <Card.Text className="green">
                        <br />
                        <span>Account successfully activated</span>
                        <br />
                        <br />
                      </Card.Text>
                    </center>
                    <Card.Link as={Link} to="/login">
                      Continue to Login
                    </Card.Link>
                  </>
                )}
              </Card.Body>
            </Card>
          </Center>
        </Col>
      </Row>
    </Container>
  );
}
