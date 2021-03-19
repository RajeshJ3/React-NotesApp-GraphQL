import { combineReducers } from "redux";
import { setAuth } from "./setAuth";

export default combineReducers({
  setAuth: setAuth,
});
