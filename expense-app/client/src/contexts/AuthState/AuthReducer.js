import { LOGIN, LOG_OUT } from "../type";

const authReducer = (state, action) => {
  const { type, payload } = action;
  // console.log(payload);
  switch (type) {
    case LOGIN: {
      const { token, isAuthenticated, user } = payload;
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
      console.log("I am in logout function");
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        user: null,
      };
    }
    default:
      return state;
  }
};

export default authReducer;
