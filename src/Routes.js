import { BrowserRouter, Switch, Route } from "react-router-dom";
import TopNav from "./components/navigations/TopNav";

// Pages
import IndexPage from "./pages/Index";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
import VerifyAccount from "./pages/VerifyAccount";

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
        <Route exact path="/login/forget-password">
          <h1>Home</h1>
        </Route>
        <Route exact path="/login/reset-password">
          <h1>Home</h1>
        </Route>
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
