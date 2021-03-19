import * as actions from "../actions";

export const setAuth = (
  state = {
    isAuthenticated: false,
    user: null,
    token: null,
    refreshToken: null,
  },
  payload
) => {
  switch (payload.type) {
    case actions.SET_AUTH:
      return {
        isAuthenticated: payload.isAuthenticated,
        user: payload.user,
        token: payload.token,
        refreshToken: payload.refreshToken,
      };
    default:
      return state;
  }
};
