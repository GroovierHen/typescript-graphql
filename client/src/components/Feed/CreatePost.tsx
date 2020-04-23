import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { useHistory } from "react-router-dom";
import { Form, Input, Button, Typography, Space, Select } from "antd";
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

const CREATE_POST = gql`
  mutation(
    $title: String!
    $description: String!
    $postType: String!
    $videoUrl: String
  ) {
    createPost(
      data: {
        title: $title
        description: $description
        postType: $postType
        videoUrl: $videoUrl
      }
    ) {
      id
      title
      description
      postType
      videoUrl
      user {
        name
      }
    }
  }
`;

export const CreatePost = () => {
  const [postType, setPostType] = useState<string>("Text");
  const [form] = Form.useForm();
  const [createPost] = useMutation(CREATE_POST);
  const { push } = useHistory();

  const onFinish = async (values: Store) => {
    const { title, description, postType, videoUrl } = values;

    try {
      await createPost({
        variables: { title, description, postType, videoUrl },
      });
      push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form
      form={form}
      name="create_post"
      onFinish={onFinish}
      scrollToFirstError
      {...formItemLayout}
      initialValues={{
        postType: "Text",
      }}
      onValuesChange={(changedValues: Store) => {
        if (changedValues.postType) {
          setPostType(changedValues.postType);
        }
      }}
    >
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <div className="title">
          <Typography.Title>Create a Post</Typography.Title>
        </div>
        <Form.Item
          name="title"
          label="Title"
          rules={[
            {
              required: true,
              message: "Title should not be empty",
            },
          ]}
          hasFeedback
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[
            {
              required: true,
              message: "Description should not be empty",
            },
          ]}
          hasFeedback
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item name="postType" label="Post type">
          <Select>
            <Select.Option value="Text">Text</Select.Option>
            <Select.Option value="Video">Video</Select.Option>
          </Select>
        </Form.Item>
        {postType === "Video" && (
          <Form.Item
            name="videoUrl"
            label="Video URL"
            rules={[
              {
                required: true,
                message: "Video URL should not be empty",
              },
            ]}
          >
            <Input />
          </Form.Item>
        )}

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Create
          </Button>
        </Form.Item>
      </Space>
    </Form>
  );
};
