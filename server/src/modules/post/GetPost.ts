import { Resolver, Query, Arg } from "type-graphql";

import { Post } from "../../entity";

@Resolver()
export class GetPostResolver {
  @Query(() => [Post])
  async getPosts() {
    const posts = await Post.find();
    return posts.map((post) => ({
      ...post,
      videoUrl: post.videoUrl == null ? "" : post.videoUrl,
    }));
  }

  @Query(() => Post)
  async getPostByID(@Arg("postId") postId: string) {
    const post = await Post.findOne(postId);
    return {
      ...post,
      videoUrl: post?.videoUrl == null ? "" : post?.videoUrl,
    };
  }
}
