import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Layout } from "antd";

import {
  Register,
  Login,
  Header,
  ConfirmEmail,
  Feed,
  Post,
  AuthRoute,
  CreatePost,
} from "./components";

export const Routes = () => (
  <BrowserRouter>
    <Layout>
      <Header />
      <Layout.Content
        className="site-layout"
        style={{ padding: 50, marginTop: 64 }}
      >
        <div
          className="site-layout-background"
          style={{ padding: 24, minHeight: 380 }}
        >
          <Switch>
            <Route exact path="/" component={Feed} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/confirm/:token" component={ConfirmEmail} />
            <Route exact path="/post/:postId" component={Post} />
            <AuthRoute exact path="/create-post" component={CreatePost} />
          </Switch>
        </div>
      </Layout.Content>
    </Layout>
  </BrowserRouter>
);
