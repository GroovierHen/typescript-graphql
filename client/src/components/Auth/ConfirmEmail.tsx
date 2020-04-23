import React, { useEffect, useCallback } from "react";
import gql from "graphql-tag";
import { useParams } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import { Typography } from "antd";

// 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

const CONFIRM_USER = gql`
  mutation($token: String!) {
    confirmUser(token: $token)
  }
`;

export const ConfirmEmail = () => {
  const [confirmUser] = useMutation(CONFIRM_USER);
  const { token } = useParams();

  const checkConfirmUser = useCallback(async () => {
    try {
      await confirmUser({ variables: { token } });
    } catch (error) {
      console.error(error);
    }
  }, [confirmUser, token]);

  useEffect(() => {
    checkConfirmUser();
  }, [checkConfirmUser]);

  return (
    <div className="title">
      <Typography.Title>Confirm</Typography.Title>
    </div>
  );
};
