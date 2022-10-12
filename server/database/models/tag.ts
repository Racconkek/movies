import {
  AllowNull,
  AutoIncrement, BelongsTo,
  Column,
  DataType, Default,
  ForeignKey,
  Index,
  Model, PrimaryKey,
  Table
} from "sequelize-typescript";
import User from "./user";

@Table
class Tag extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  id: number;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  authorId: number;

  @BelongsTo(() => User, "authorId")
  author: User;

  @AllowNull(false)
  @Default("")
  @Column(DataType.STRING)
  name: string;

  @AllowNull(false)
  @Default("")
  @Column(DataType.STRING)
  color: string;
}

export default Tag;
