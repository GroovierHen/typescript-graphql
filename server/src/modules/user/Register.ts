import { Resolver, Query, Mutation, Arg } from "type-graphql";
import bcrypt from "bcryptjs";

import { User } from "../../entity";
import { BCRYPT_WORK_FACTOR } from "../../config";
import { RegisterInput } from "./inputs/RegisterInput";
import { sendEmail, createConfirmationUrl } from "../../utils";

@Resolver()
export class RegisterResolver {
  @Query(() => String)
  async hello() {
    return "Hello World";
  }

  @Mutation(() => User)
  async register(
    @Arg("data") { firstName, lastName, email, password }: RegisterInput
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, +BCRYPT_WORK_FACTOR);
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    }).save();

    await sendEmail(email, await createConfirmationUrl(user.id));

    return user;
  }
}
