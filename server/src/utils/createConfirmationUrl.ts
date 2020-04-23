import { v4 } from "uuid";
import { ObjectID } from "typeorm";

import { client as redis } from "../redis";

export const createConfirmationUrl = async (userId: ObjectID) => {
  const token = v4();
  await redis.set(token, userId.toHexString(), "ex", 60 * 60); // 1 hour expiration

  return `http://localhost:3000/confirm/${token}`;
};

export const createResetPasswordUrl = async (userId: ObjectID) => {
  const token = v4();
  await redis.set(token, userId.toHexString(), "ex", 60 * 60); // 1 hour expiration

  return `http://localhost:3000/user/change-password/${token}`;
};
