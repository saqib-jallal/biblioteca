import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import { AUTH_ERROR, SIGNUP_FAIL, SIGNUP_SUCCESS, USER_LOADED } from "./types";

export const loadUser = () => async (dispatch) => {
  if (localStorage.token) setAuthToken(localStorage.token);
  try {
    const res = axios.get("api/user");
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const signUp =
  ({ email_id, full_name, user_name, password, phone_number }) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ email_id, full_name, user_name, password, phone_number });

    try {
      const res = axios.post("api/user", body, config);
      dispatch({
        type: SIGNUP_SUCCESS,
        payload: res.data,
      });
      dispatch(loadUser());
    } catch (error) {
      dispatch({
        type: SIGNUP_FAIL,
      });
    }
  };
