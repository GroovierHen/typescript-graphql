import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Link } from "react-router-dom";
import ReactPlayer from "react-player";
import { Row, Col, Typography, Card, Skeleton } from "antd";

const GET_FEED = gql`
  query {
    getPosts {
      id
      videoUrl
      title
      postType
      description
      user {
        name
      }
    }
  }
`;

export const Feed = () => {
  const { loading, error, data } = useQuery(GET_FEED);

  if (error) {
    return (
      <div className="title">
        <Typography.Title>Something went wrong</Typography.Title>
      </div>
    );
  }

  return (
    <Row>
      <Col xs={{ span: 24, offset: 0 }} lg={{ span: 12, offset: 6 }}>
        <div className="title">
          <Typography.Title>Feed</Typography.Title>
        </div>
      </Col>
      {data ? (
        data.getPosts.map((feed: any) => {
          if (feed.postType === "Video" && feed.videoUrl) {
            return (
              <Col
                key={feed.id}
                xs={{ span: 24, offset: 0 }}
                lg={{ span: 12, offset: 6 }}
                style={{ marginBottom: "1em" }}
              >
                <Card
                  title={feed.title}
                  extra={<Link to={`/post/${feed.id}`}>More</Link>}
                >
                  <ReactPlayer url={feed.videoUrl} controls width="100%" />
                </Card>
              </Col>
            );
          } else {
            return (
              <Col
                key={feed.id}
                xs={{ span: 24, offset: 0 }}
                lg={{ span: 12, offset: 6 }}
                style={{ marginBottom: "1em" }}
              >
                <Card
                  title={feed.title}
                  extra={<Link to={`/post/${feed.id}`}>More</Link>}
                >
                  <p>{feed.description}</p>
                </Card>
              </Col>
            );
          }
        })
      ) : (
        <Col xs={{ span: 24, offset: 0 }} lg={{ span: 12, offset: 6 }}>
          <Skeleton active loading={loading} />
        </Col>
      )}
    </Row>
  );
};
