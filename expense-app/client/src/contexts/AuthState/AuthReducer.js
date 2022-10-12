import { token } from "morgan";
import { GET_USER_INFO, LOGIN, LOG_OUT } from "../type";

const authReducer = (state, action) => {
  const { type, payload } = action;
  const { token, isAuthenticated, user } = payload;
  // console.log(payload);
  switch (type) {
    case LOGIN: {
      // console.log({ token, isAuthenticated, user });
      localStorage.setItem("token", token);
      localStorage.setItem("user", user);
      return {
        ...state,
        token: token,
        isAuthenticated: isAuthenticated,
        user: user,
      };
    }
    case LOG_OUT: {
      // console.log("I am in logout function");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        user: null,
      };
    }
    case GET_USER_INFO: {
      return {
        ...state, 
        token: token, 
        isAuthenticated: isAuthenticated,
        user: user,
      }
    }
    default:
      return state;
  }
};

export default authReducer;
