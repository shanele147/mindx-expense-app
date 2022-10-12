import { useEffect, useReducer } from "react";
import AuthServices from "../../services/authService";
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
  // console.log(state);

  const setAuthToken = async () => {
    const userInfo = await AuthServices.verifyToken();
  };

  useEffect(() => {
    setAuthToken();
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
