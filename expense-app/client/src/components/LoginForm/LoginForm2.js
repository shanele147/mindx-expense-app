import React from "react";
import { Button, Form, Input, Typography } from "antd";
import "./LoginForm.css";

const { Text } = Typography;

const LoginForm2 = (props) => {
  const { onSubmit, error, inProgress } = props;

  const onFinish = async (values) => {
    onSubmit(values);
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <h3 className="login-title">Login Form</h3>
        <Form
          name="login-form"
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input autoComplete="off" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
              {
                min: 4,
                message: "Password need to greater than 4",
              },
            ]}
          >
            <Input.Password autoComplete="off" />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit" loading={inProgress}>
              {inProgress ? "Submitting..." : "Login"}
            </Button>
          </Form.Item>
          {error && <Text type="danger">{error}</Text>}
        </Form>
      </div>
    </div>
  );
};

export default LoginForm2;
