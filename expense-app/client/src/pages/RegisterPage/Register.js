import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../contexts/AuthState/AuthContext";
import AuthServices from "../../services/authService";
import SignupForm from "../../components/SignupForm/SignupForm";

const RegisterPage = () => {
  const [signupInProgress, setSignupProgress] = useState(false);
  const [signupError, setSignupError] = useState(null);
  const { dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const onSignupHandler = async (values) => {
    setSignupProgress(true);
    try {
      const signRes = await AuthServices.register(values);
      console.log(signRes);

      setTimeout(() => {
        setSignupProgress(false);
        navigate("/login");
      }, 2000);
    } catch (err) {
      setSignupError(err.response.data.msg);
      console.log(err);
    }
  };

  return (
    <SignupForm
      inProgress={signupInProgress}
      onSubmit={onSignupHandler}
      error={signupError}
    />
  );
};

export default RegisterPage;
