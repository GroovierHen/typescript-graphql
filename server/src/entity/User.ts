import {
  Column,
  Entity,
  ObjectID,
  ObjectIdColumn,
  BaseEntity,
  BeforeInsert,
} from "typeorm";
import { ObjectType, Field, ID, Root } from "type-graphql";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @ObjectIdColumn()
  id: ObjectID;

  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  lastName: string;

  @Field()
  @Column("text", { unique: true })
  email: string;

  @Field()
  name(@Root() parent: User): string {
    return `${parent.firstName} ${parent.lastName}`;
  }

  @Column()
  password: string;

  @Column()
  confirmed: boolean;

  @Field()
  @Column({ nullable: true })
  stripeId: string;

  @BeforeInsert()
  beforeInserAction() {
    this.confirmed = false;
  }
}
