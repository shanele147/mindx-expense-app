import React, { useState, useContext } from "react";
import SigninForm from "../../components/SigninForm/SigninForm";
import AuthServices from "../../services/authService";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../contexts/AuthState/AuthContext";
import { LOGIN } from "../../contexts/type";
import actionCreator from "../../utils/actionCreator";

import "./SigninPage.css";
import PageContainer from "../../components/PageContainer/PageContainer.js";

const SigninPage = (props) => {
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
        // console.log(loginRes.data);
        dispatch(actionCreator(LOGIN, loginRes.data));
        setLoginProgress(false);
        navigate("/");
      }, 1000);
    } catch (err) {
      setTimeout(() => {
        console.log(err);
        setLoginError(err.response.data);
        setLoginProgress(false);
      }, 1000);
    }
  };

  return (
    // <PageContainer>
    <SigninForm
      onSubmit={onLoginHandler}
      inProgress={loginInProgress}
      error={loginError}
    />
    // </PageContainer>
  );
};

export default SigninPage;
