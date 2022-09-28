import {
  Table,
  Column,
  Model,
  DataType,
  AutoIncrement,
  PrimaryKey,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import User from "./user";

@Table
class Comment extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  id: number;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  authorId: number;

  @BelongsTo(() => User, "authorId")
  author: User;

  @Column(DataType.STRING)
  text: string;
}

export default Comment;
