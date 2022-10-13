import { useEffect, useReducer } from "react";
import AuthServices from "../../services/authService";
import AuthContext from "./AuthContext";
import authReducer from "./AuthReducer";
import actionCreator from "../../utils/actionCreator";
import { LOG_OUT, GET_USER_INFO } from "../type";
import axiosInstance from "../../services/axiosInstance";

const initialState = {
  token: localStorage.getItem("token") || null,
  // convert token is string to boolean !(string) => !false => true
  isAuthenticated: !!localStorage.getItem("token") || false,
  user: null,
};

/* attach the token if it existed in the localStorage to the headers */
const setAuthToken = async (token) => {
  if (token) {
    // default config for headers of axios
    // axiosInstance.defaults.headers.common["authorization-token"] = token;
    axiosInstance.defaults.headers.common["token"] = token;
  }
};

const AuthState = (props) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  // console.log(state);

  /* check if token was stored in localStorage is expired or not */
  const verifyToken = async () => {
    try {
      const authorizedToken = await AuthServices.verifyToken();
      console.log(authorizedToken.data.msg);
      // if token does not expired or invalid => dispatch to global state
      dispatch(actionCreator(GET_USER_INFO, authorizedToken.data));
    } catch (err) {
      err.response.data.msg
        ? console.log(err.response.data.msg)
        : console.log(err.response.data);
      dispatch(actionCreator(LOG_OUT));
    }
  };

  useEffect(() => {
    /* 1. set the token for Headers when call API. If request doesn't have body in Headers => illegal request */
    setAuthToken(state.token);
    /* 2. Call API with request body in Headers*/
    verifyToken();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
