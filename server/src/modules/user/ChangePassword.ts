import { Resolver, Mutation, Arg, Ctx } from "type-graphql";
import { hash } from "bcryptjs";

import { User } from "../../entity";
import { ChangePasswordInput } from "./inputs/ChangePasswordInputs";
import { client as redis } from "../../redis";
import { BCRYPT_WORK_FACTOR } from "../../config";
import { MyContext } from "../../types/MyContext";

@Resolver()
export class ChangePasswordResolver {
  @Mutation(() => User, { nullable: true })
  async changePassword(
    @Arg("data") { token, password }: ChangePasswordInput,
    @Ctx() ctx: MyContext
  ): Promise<User | null> {
    const userId = await redis.get(token);

    if (!userId) {
      return null;
    }

    const user = await User.findOne(userId);

    if (!user) {
      return null;
    }

    user.password = await hash(password, +BCRYPT_WORK_FACTOR);

    await user.save();
    await redis.del(token);

    ctx.req.session!.userId = user.id;

    return user;
  }
}
