import { Resolver, Mutation, Arg, UseMiddleware, Ctx } from "type-graphql";

import { Post, User } from "../../entity";
import { CreatePostInput } from "./inputs/CreatePostInput";
import { isAuth } from "../../middleware";
import { MyContext } from "../../types/MyContext";
import { getMongoManager } from "typeorm";

@Resolver()
export class PostResolver {
  @UseMiddleware(isAuth)
  @Mutation(() => Post)
  async createPost(
    @Arg("data") { title, description, postType, videoUrl }: CreatePostInput,
    @Ctx() ctx: MyContext
  ): Promise<Post> {
    const userId = ctx.req.session?.userId;

    const user: User | undefined = await User.findOne(userId);

    const post = new Post();
    post.title = title;
    post.description = description;
    post.postType = postType;
    post.videoUrl = videoUrl == null ? "" : videoUrl;
    post.user = user!;

    const manager = getMongoManager();
    await manager.save(post);

    // const post = await Post.create({
    //   title,
    //   description,
    //   postType,
    //   videoUrl,
    //   user: {
    //     ...user,
    //     confirmed: user?.confirmed,
    //   },
    // }).save();

    return post;
  }
}
