import { token } from "morgan";
import { GET_USER_INFO, LOGIN, LOG_OUT } from "../type";

const authReducer = (state, action) => {
  const { type, payload } = action;

  // console.log({ token, isAuthenticated, user });
  // console.log(payload);

  switch (type) {
    case LOGIN: {
      const { token, isAuthenticated, user } = payload;
      console.log(payload);
      localStorage.setItem("token", token);
      return {
        ...state,
        token,
        isAuthenticated,
        user: user.username,
      };
    }
    case LOG_OUT: {
      // console.log("I am in logout function");
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        user: null,
      };
    }
    case GET_USER_INFO: {
      const { user } = payload;
      // console.log(payload);
      return {
        ...state,
        user: user.username,
      };
    }
    default:
      return state;
  }
};

export default authReducer;
