import * as actions from ".";

export const setAuth = (payload) => (dispatch) => {
  dispatch({
    type: actions.SET_AUTH,
    isAuthenticated: payload.isAuthenticated,
    user: payload.user,
    token: payload.token,
    refreshToken: payload.refreshToken,
  });
};
