import path from "path";
import express from "express";
import session, { Store } from "express-session";

import { Stripe } from "stripe";

const config: Stripe.StripeConfig = {
  apiVersion: "2020-03-02",
  typescript: true,
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, config);

import { SESSION_OPTIONS } from "./config";
import { User } from "./entity";

export const createApp = (store: Store) => {
  const app = express();

  app.use(
    session({
      store,
      ...SESSION_OPTIONS,
    })
  );

  app.use(express.static(path.join(__dirname, "../public")));

  app.get("/connect-stripe", async (req, res, _next) => {
    const { code } = req.query;

    if (req.session!.userId) {
      throw new Error("not authenticated");
    }

    const user = await User.findOne(req.session!.userId);

    if (!user) {
      throw new Error("User not found");
    }

    const response = await stripe.oauth.token({
      grant_type: "authorization_code",
      code: code.toString(),
    });

    user.stripeId = response.stripe_user_id as any;
    await user.save();

    res.redirect("http://localhost:3000");
  });

  return app;
};
