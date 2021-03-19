import { useEffect, useState } from "react";
import Routes from "./Routes";

import { setAuth } from "./store/actions/setAuth";
import { connect } from "react-redux";

function App(props) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refreshToken");
    let user = localStorage.getItem("user");
    try {
      user = JSON.parse(user);
    } catch {
      user = null;
    }
    if (token && refreshToken && user) {
      props.setAuth({
        isAuthenticated: true,
        user: user,
        token: token,
        refreshToken: refreshToken,
      });
    } else {
      props.setAuth({
        isAuthenticated: false,
        user: null,
        token: null,
        refreshToken: null,
      });
    }
    setLoading(false);
  }, [props]);

  return loading ? <>Loading..</> : <Routes />;
}

const mapDispatchToProps = (dispatch) => {
  return {
    setAuth: (payload) => dispatch(setAuth(payload)),
  };
};

export default connect(null, mapDispatchToProps)(App);
