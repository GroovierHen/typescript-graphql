import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import session from "express-session";
import connectRedis from "connect-redis";

import { createApp } from "./app";
import { client } from "./redis";
import { PORT } from "./config";

(async () => {
  await createConnection();

  const schema = await buildSchema({
    resolvers: [__dirname + "/modules/**/*.ts"],
    authChecker: ({ context: { req } }) => {
      return !!req.session.userId;
    },
  });

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }) => ({ req, res }),
  });

  const RedisStore = connectRedis(session);

  const store = new RedisStore({ client });

  const app = createApp(store);

  apolloServer.applyMiddleware({
    app,
    cors: {
      origin: "http://localhost:3000",
      credentials: true,
    },
  });

  app.listen(PORT, () =>
    console.log(`Server started on localhost:${PORT}/graphql`)
  );
})();
