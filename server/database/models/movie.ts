import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  BelongsToMany,
  AllowNull,
  Default,
  AutoIncrement,
  PrimaryKey,
  HasMany,
} from "sequelize-typescript";
import Like from "./like";
import Comment from "./comment";
import User from "./user";
import Tag from "./tag";
import { MoviesTags } from "./moviesTags";

@Table
class Movie extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  id: number;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  authorId: number;

  @BelongsToMany(() => User, () => Like, "movieId")
  usersWhoLike: User[];

  @BelongsTo(() => User, "authorId")
  author: User;

  @HasMany(() => Comment, {
    foreignKey: "movieId",
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
    hooks: true,
  })
  comments: Comment[];

  @BelongsToMany(() => Tag, () => MoviesTags)
  tags: Tag[];

  @AllowNull(false)
  @Default("")
  @Column(DataType.STRING)
  name: string;

  @Column(DataType.STRING)
  description: string;
}

export default Movie;
