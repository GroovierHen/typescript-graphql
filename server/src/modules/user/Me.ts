import { Resolver, Query, Ctx } from "type-graphql";

import { User } from "../../entity";
import { MyContext } from "../../types/MyContext";

@Resolver()
export class MeResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() ctx: MyContext) {
    if (!ctx.req.session!.userId) {
      return undefined;
    }

    const user = await User.findOne(ctx.req.session!.userId);

    if (!user?.stripeId || user?.stripeId === null) {
      return {
        ...user,
        stripeId: "",
      };
    } else {
      return user;
    }
  }
}
