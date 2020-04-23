import { Resolver, Mutation, Arg, Ctx } from "type-graphql";
import bcrypt from "bcryptjs";

import { User } from "../../entity";
import { LoginInput } from "./inputs/LoginInput";
import { MyContext } from "../../types/MyContext";

@Resolver()
export class LoginResolver {
  @Mutation(() => User, { nullable: true })
  async login(
    @Arg("data") { email, password }: LoginInput,
    @Ctx() ctx: MyContext
  ): Promise<User | null> {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new Error("user not found");
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      throw new Error("email or password does not match");
    }

    if (!user.confirmed) {
      throw new Error("plz confirm your email");
    }

    ctx.req.session!.userId = user.id;

    return user;
  }
}
