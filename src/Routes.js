import { BrowserRouter, Switch, Route } from "react-router-dom";
import TopNav from "./components/navigations/TopNav";

// Pages
import IndexPage from "./pages/Index";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
import VerifyAccount from "./pages/VerifyAccount";
import ForgotPassword from "./pages/ForgotPassword";
import PasswordReset from "./pages/PasswordReset";

export default function Routes(props) {
  return (
    <BrowserRouter>
      <TopNav />
      <Switch>
        <Route exact path="/">
          <IndexPage />
        </Route>
        <Route exact path="/login">
          <LoginPage />
        </Route>
        <Route exact path="/login/forgot-password">
          <ForgotPassword />
        </Route>
        <Route exact path="/login/forgot-password/confirm/:token"
        render={(props) => <PasswordReset {...props} />}
        />
        <Route exact path="/signup">
          <SignupPage />
        </Route>
        <Route
          exact
          path="/signup/verify-account/:token"
          render={(props) => <VerifyAccount {...props} />}
        />
      </Switch>
    </BrowserRouter>
  );
}
