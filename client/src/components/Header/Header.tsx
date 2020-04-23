import React from "react";
import { Link, useLocation } from "react-router-dom";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { Layout, Menu } from "antd";
import { ClickParam } from "antd/lib/menu";

const ME_QUERY = gql`
  query {
    me {
      email
      stripeId
    }
  }
`;

const LOGOUT = gql`
  mutation {
    logout
  }
`;

export const Header = () => {
  const { pathname } = useLocation();
  const { data } = useQuery(ME_QUERY);
  const [logout] = useMutation(LOGOUT);

  console.log(data);

  const handleLogout = async (param: ClickParam) => {
    if (param.key === "logout") {
      await logout();
      window.location.pathname = "/";
    }
  };

  return (
    <Layout.Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
      {data?.me ? (
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={[pathname]}
          onClick={handleLogout}
        >
          <Menu.Item key="/">
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="/create-post">
            <Link to="/create-post">Create Post</Link>
          </Menu.Item>
          {!data?.me.stripeId && (
            <Menu.Item>
              <a
                href="https://dashboard.stripe.com/oauth/authorize?response_type=code&client_id=ca_H8xYIQV6w2K0vj5jSfDPmJ6sbHYAa6I7&scope=read_write"
                className="stripe-connect"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>Connect with Stripe</span>
              </a>
            </Menu.Item>
          )}

          <Menu.Item key="logout">Logout</Menu.Item>
        </Menu>
      ) : (
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[pathname]}>
          <Menu.Item key="/">
            <Link to="/">Home</Link>
          </Menu.Item>

          <Menu.Item key="/login">
            <Link to="/login">Login</Link>
          </Menu.Item>

          <Menu.Item key="/register">
            <Link to="/register">Register</Link>
          </Menu.Item>
        </Menu>
      )}
    </Layout.Header>
  );
};
