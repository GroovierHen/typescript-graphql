import { Length, IsUrl } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class CreatePostInput {
  @Field()
  @Length(1, 255)
  title: string;

  @Field()
  @Length(1, 255)
  description: string;

  @Field()
  postType: string;

  @Field({ nullable: true })
  @IsUrl()
  videoUrl: string;
}
