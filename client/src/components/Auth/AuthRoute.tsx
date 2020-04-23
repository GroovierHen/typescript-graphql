import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import {
  RouteProps,
  Route,
  RouteComponentProps,
  Redirect,
} from "react-router-dom";

const ME_QUERY = gql`
  query {
    me {
      email
    }
  }
`;

export const AuthRoute: React.FC<RouteProps> = ({ component, ...rest }) => {
  const { loading, error, data } = useQuery(ME_QUERY);

  const renderRoute = (routeProps: RouteComponentProps<{}>) => {
    if (!data || loading || error) {
      return null;
    }

    if (!data.me) {
      // user not login
      return <Redirect to="/login" />;
    }

    const Component = component as any;

    return <Component {...routeProps} />;
  };

  return <Route {...rest} render={renderRoute} />;
};
