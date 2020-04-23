import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { Col, Typography, Card, Tag, Space } from "antd";

const GET_POST = gql`
  query($postId: String!) {
    getPostByID(postId: $postId) {
      id
      title
      description
      postType
      videoUrl
      user {
        firstName
      }
    }
  }
`;

export const Post = () => {
  const { postId } = useParams();
  const { loading, error, data } = useQuery(GET_POST, {
    variables: { postId },
  });

  if (error) {
    return (
      <div className="title">
        <Typography.Title>Something went wrong</Typography.Title>
      </div>
    );
  }

  return (
    <Col
      xs={{ span: 24, offset: 0 }}
      lg={{ span: 12, offset: 6 }}
      style={{ marginTop: "7em" }}
    >
      {data?.getPostByID.postType === "Video" && data.getPostByID.videoUrl ? (
        <Card title={data.getPostByID.title} loading={loading}>
          <Space direction="vertical" size="large" style={{ width: "100%" }}>
            <p>{data.getPostByID.description}</p>
            <ReactPlayer
              url={data.getPostByID.videoUrl}
              controls
              width="100%"
            />
            <div>
              <span style={{ marginRight: 8 }}>Post By:</span>
              <Tag>{data.getPostByID.user.firstName}</Tag>
              <span style={{ marginRight: 8 }}>Post Type:</span>
              <Tag>{data.getPostByID.postType}</Tag>
            </div>
          </Space>
        </Card>
      ) : (
        <Card title={data?.getPostByID.title} loading={loading}>
          <Space direction="vertical" size="large" style={{ width: "100%" }}>
            <p>{data?.getPostByID.description}</p>
            <div></div>
            <div>
              <span style={{ marginRight: 8 }}>Post By:</span>
              <Tag>{data?.getPostByID.user.firstName}</Tag>
              <span style={{ marginRight: 8 }}>Post Type:</span>
              <Tag>{data?.getPostByID.postType}</Tag>
            </div>
          </Space>
        </Card>
      )}
    </Col>
  );
};
