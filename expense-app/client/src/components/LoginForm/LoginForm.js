import React, { useState } from "react";
import {
  Input,
  Select,
  Option,
  Button,
  Dialog,
  DialogBody,
} from "@material-tailwind/react";
import "../../components/TransactionForm/TransactionForm.css";

const LoginForm = (props) => {
  const { onSubmit, inProgress, error } = props;
  const [submitValue, setSubmitValue] = useState({
    username: "",
    password: "",
  });
  const onFinish = async (e) => {
    e.preventDefault();
    onSubmit(submitValue);
    setSubmitValue({
      username: "",
      password: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSubmitValue({ ...submitValue, [name]: value });
  };

  return (
    <div className="sm:w-full md:w-1/2 m-auto flex min-h-full h-full items-center justify-center py-20 px-6 md:px-10 lg:px-8 login-form">
      <div className="w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center md:text-2xl lg:text-3xl font-bold tracking-tight text-white">
            Log in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={onFinish}>
          <Input
            key="username"
            label="Username"
            name="username"
            type="text"
            className="expense-input"
            color="deep-purple"
            size="lg"
            variant="standard"
            required={true}
            value={submitValue.username}
            onChange={handleInputChange}
            autoComplete="off"
          />
          <Input
            key="password"
            label="Password"
            name="password"
            type="password"
            className="expense-input"
            color="deep-purple"
            size="lg"
            variant="standard"
            required={true}
            value={submitValue.password}
            onChange={handleInputChange}
            autoComplete="off"
          />
          {error && (
            <div style={{ color: "#bd2560", fontSize: "0.95rem" }}>{error}</div>
          )}

          <div className="w-full flex flex-row justify-center items-center">
            <Button
              className={`sm:w-1/2 md:w-1/3 mt-12 md:px-6 lg:px-10 py-3 btn-submit`}
              type="submit"
              style={{ fontSize: "0.85rem", textTransform: "capitalize" }}
            >
              {inProgress ? "Submitting..." : "Login"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
