import { Resolver, Mutation, Arg } from "type-graphql";

import { User } from "../../entity";
import { sendEmail, createResetPasswordUrl } from "../../utils";

@Resolver()
export class ForgotPasswordResolver {
  @Mutation(() => Boolean)
  async forgotPassword(@Arg("email") email: string): Promise<boolean> {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new Error("user not found");
    }

    await sendEmail(email, await createResetPasswordUrl(user.id));

    return true;
  }
}
