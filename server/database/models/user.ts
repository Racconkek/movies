import {
  Table,
  Column,
  Model,
  AutoIncrement,
  PrimaryKey,
  DataType,
  HasMany,
  Default,
  BelongsToMany,
  Index,
} from "sequelize-typescript";
import LikeUserVideo from "./likeUserVideo";

@Table
class User extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  id: number;

  @Default("")
  @Column(DataType.STRING)
  firstName!: string;

  @Default("")
  @Column(DataType.STRING)
  secondName!: string;

  @Column(DataType.STRING)
  @Index({
    unique: true,
    name: "email-index",
  })
  email!: string;

  @Column(DataType.STRING)
  avatar!: string;
}

export default User;
