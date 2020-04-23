import React from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { useHistory } from "react-router-dom";
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

const REGISTER_USER = gql`
  mutation(
    $firstname: String!
    $lastname: String!
    $email: String!
    $password: String!
  ) {
    register(
      data: {
        firstName: $firstname
        lastName: $lastname
        email: $email
        password: $password
      }
    ) {
      id
      firstName
      lastName
      email
      name
    }
  }
`;

export const Register = () => {
  const [form] = Form.useForm();
  const [registerUser, { error }] = useMutation(REGISTER_USER);
  const { push } = useHistory();

  const onFinish = async (values: Store) => {
    const { firstname, lastname, email, password } = values;

    try {
      await registerUser({
        variables: { firstname, lastname, email, password },
      });
      push("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form
      form={form}
      name="register"
      onFinish={onFinish}
      scrollToFirstError
      {...formItemLayout}
    >
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <div className="title">
          <Typography.Title>Register</Typography.Title>
        </div>
        <Form.Item
          name="firstname"
          label="First Name"
          rules={[
            {
              required: true,
              message: "Please input your First Name!",
            },
          ]}
          hasFeedback
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="lastname"
          label="Last Name"
          rules={[
            {
              required: true,
              message: "Please input your Last Name!",
            },
          ]}
          hasFeedback
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="E-mail"
          validateStatus={error && "error"}
          help={error && "Email already exists"}
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
            Register
          </Button>
        </Form.Item>
      </Space>
    </Form>
  );
};
