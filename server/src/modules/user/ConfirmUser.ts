import { Resolver, Mutation, Arg } from "type-graphql";
import { ObjectID } from "mongodb";

import { User } from "../../entity";
import { client as redis } from "../../redis";

@Resolver()
export class ConfirmUserResolver {
  @Mutation(() => Boolean)
  async confirmUser(@Arg("token") token: string): Promise<boolean> {
    const userId = await redis.get(token);

    if (!userId) {
      throw new Error("user not found");
    }

    const userObjectId = ObjectID.createFromHexString(userId);

    await User.update({ id: userObjectId }, { confirmed: true });
    await redis.del(token);

    return true;
  }
}
