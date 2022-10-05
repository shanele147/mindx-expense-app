import { LOGIN, LOG_OUT } from "../type";

const authReducer = (state, action) => {
  const { type, payload } = action;
  // console.log(payload);
  switch (type) {
    case LOGIN: {
      const { token, isAuthenticated } = payload;
      console.log({ token, isAuthenticated });
      localStorage.setItem("token", token);
      return {
        ...state,
        token: token,
        isAuthenticated: isAuthenticated,
      };
    }
    case LOG_OUT: {
      console.log("I am in logout function");
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
      };
    }
    default:
      return state;
  }
};

export default authReducer;
