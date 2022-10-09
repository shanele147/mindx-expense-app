import React, { useState, useContext } from "react";
import LoginForm from "../../components/LoginForm/LoginForm.js";
import AuthServices from "../../services/authService";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../contexts/AuthState/AuthContext";
import { LOGIN } from "../../contexts/type";
import actionCreator from "../../utils/actionCreator";

import "./LoginPage.css";
import PageContainer from "../../components/PageContainer/PageContainer.js";

const LoginPage = (props) => {
  const [loginError, setLoginError] = useState(null);
  const [loginInProgress, setLoginProgress] = useState(false);
  const { dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const onLoginHandler = async (values) => {
    console.log(values);
    setLoginProgress(true);
    try {
      const loginRes = await AuthServices.login(values);
      // loginRes.data contained the information of payload is : token & isAuthenticated
      setTimeout(() => {
        dispatch(actionCreator(LOGIN, loginRes.data));
        setLoginProgress(false);
        navigate("/");
      }, 1000);
    } catch (err) {
      setLoginError(err.response.data.msg);
      console.log(loginError);
      setLoginProgress(false);

      // set demo for loading after submitting
      /* setTimeout(() => {
        console.log(loginError);
        setLoginProgress(false);
      }, 2000); */
    }
  };

  return (
    // <PageContainer>
    <LoginForm
      onSubmit={onLoginHandler}
      inProgress={loginInProgress}
      error={loginError}
    />
    // </PageContainer>
  );
};

export default LoginPage;
