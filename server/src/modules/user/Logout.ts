import { Resolver, Mutation, Ctx } from "type-graphql";

import { MyContext } from "../../types/MyContext";
import { SESSION_NAME } from "../../config";

@Resolver()
export class LogoutResolver {
  @Mutation(() => Boolean)
  async logout(@Ctx() ctx: MyContext): Promise<Boolean> {
    return new Promise((resolve, reject) =>
      ctx.req.session!.destroy((err) => {
        if (err) {
          console.error(err);
          return reject(false);
        }
        ctx.res.clearCookie(SESSION_NAME);
        return resolve(true);
      })
    );
  }
}
