import { Container } from "react-bootstrap";
import LoginAlert from "./LoginAlert";

// Global state
import { connect } from "react-redux";

function IndexPage(props) {
  return props.checkAuth.isAuthenticated ? (
    <Container>
      <center>
        <h4 className="mt-5 pt-5">
          Welcome <b>{props.checkAuth.user.username}</b>
        </h4>
      </center>
    </Container>
  ) : (
    <LoginAlert />
  );
}

const mapStateToProps = (state) => {
  return {
    checkAuth: state.setAuth,
  };
};

export default connect(mapStateToProps)(IndexPage);
