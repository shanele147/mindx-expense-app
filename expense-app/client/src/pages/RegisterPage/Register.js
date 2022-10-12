import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthServices from "../../services/authService";
import SignupForm from "../../components/SignupForm/SignupForm";

const RegisterPage = () => {
  const [signupInProgress, setSignupProgress] = useState(false);
  const [signupError, setSignupError] = useState(null);
  const [successMess, setSuccessMess] = useState(null);

  const navigate = useNavigate();

  const onSignupHandler = async (values) => {
    setSignupProgress(true);
    try {
      const signRes = await AuthServices.register(values);
      console.log(signRes);

      setTimeout(() => {
        setSignupProgress(false);
        setSuccessMess(
          "Register successfully. Please sign in to use this app."
        );
        navigate("/login");
      }, 1500);
    } catch (err) {
      setTimeout(() => {
        setSignupError(err.response.data);
        console.log(err);
        setSignupProgress(false);
      }, 1000);
    }
  };

  return (
    <SignupForm
      inProgress={signupInProgress}
      onSubmit={onSignupHandler}
      error={signupError}
      success={successMess}
    />
  );
};

export default RegisterPage;
