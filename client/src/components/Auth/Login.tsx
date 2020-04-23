import React from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { Form, Input, Button, Typography, Space } from "antd";
import { Store } from "antd/lib/form/interface";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      offset: 5,
    },
  },
};

const LOGIN_USER = gql`
  mutation($email: String!, $password: String!) {
    login(data: { email: $email, password: $password }) {
      id
      firstName
      lastName
      email
      name
    }
  }
`;

export const Login = () => {
  const [form] = Form.useForm();
  const [loginUser, { error }] = useMutation(LOGIN_USER);

  const onFinish = async (values: Store) => {
    const { email, password } = values;
    try {
      await loginUser({ variables: { email, password } });
      window.location.pathname = "/";
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form
      form={form}
      name="login"
      onFinish={onFinish}
      scrollToFirstError
      {...formItemLayout}
    >
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <div className="title">
          <Typography.Title>Login</Typography.Title>
        </div>
        <Form.Item
          name="email"
          label="E-mail"
          validateStatus={error && "error"}
          help={error && error.message.split(":")[1]}
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Space>
    </Form>
  );
};
