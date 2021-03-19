import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

// API
import { useMutation, gql } from "@apollo/client";

export default function SignupSuccess(props) {
  const [resent, setResent] = useState(false);
  const [resentCount, setResentCount] = useState(1);
  const [error, setError] = useState(null);

  const RESEND = gql`
    mutation resendActivationEmail($email: String!) {
      resendActivationEmail(email: $email) {
        success
      }
    }
  `;
  const [resendActivationEmail, { loading, data }] = useMutation(RESEND);

  useEffect(() => {
    setResent(
      data && data.resendActivationEmail && data.resendActivationEmail.success
    );
  }, [data]);

  const handleResendEmail = () => {
    if (resentCount > 1) {
      setError("Maximum email sent limit reached!");
    }
    setResent(false);
    resendActivationEmail({ variables: { email: props.email } });
    setResentCount(resentCount + 1);
  };
  return (
    <Card>
      <Card.Body>
        <Card.Title>Confirm E-mail</Card.Title>
        <Card.Text>
          An email with confirmation link has been sent you your e-mail address.
          <br />
          Please confirm your email.
        </Card.Text>
        {resent ? (
          <Card.Text className="green">
            <small>Email sent!</small>
          </Card.Text>
        ) : null}
        {error ? (
          <Card.Text className="red">
            <small>{error}</small>
          </Card.Text>
        ) : null}
        {loading ? (
          <Card.Link aria-disabled="true" style={{ cursor: "pointer" }}>Sending...</Card.Link>
        ) : error ? null : (
          <Card.Link style={{ cursor: "pointer" }} onClick={handleResendEmail}>
            Resend e-mail
          </Card.Link>
        )}
        <Card.Link as={Link} to="/login">
          Continue to Login
        </Card.Link>
      </Card.Body>
    </Card>
  );
}
