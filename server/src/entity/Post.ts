import { Column, Entity, ObjectID, ObjectIdColumn, BaseEntity } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";

import { User } from "./User";

@ObjectType()
@Entity()
export class Post extends BaseEntity {
  @Field(() => ID)
  @ObjectIdColumn()
  id: ObjectID;

  @Field()
  @Column()
  user: User;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  description: string;

  @Field()
  @Column()
  postType: string;

  @Field()
  @Column("text", { nullable: true })
  videoUrl: string;
}
