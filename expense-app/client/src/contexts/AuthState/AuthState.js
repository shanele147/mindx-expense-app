import { useReducer } from "react";
import AuthContext from "./AuthContext";
import authReducer from "./AuthReducer";

const initialState = {
  token: localStorage.getItem("token") || null,
  // convert token is string to boolean !(string) => !false => true
  isAuthenticated: !!localStorage.getItem("token") || false,
  user: null,
};

const AuthState = (props) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  
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
