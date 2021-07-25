import { AUTH_ERROR, SIGNUP_SUCCESS, SIGNUP_FAIL, USER_LOADED } from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isLoggedIn: null,
  loading: true,
  user: null,
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        loading: false,
        isLoggedIn: true,
        user: payload,
      };
    case SIGNUP_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isLoggedIn: true,
        loading: false,
      };
    case SIGNUP_FAIL:
    case AUTH_ERROR:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isLoggedIn: false,
        loading: false,
        user: null,
      };
    default:
      return state;
  }
};

export default authReducer;
