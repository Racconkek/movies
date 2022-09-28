import {
  Column,
  DataType,
  ForeignKey,
  Index,
  Model,
  Table,
} from "sequelize-typescript";
import User from "./user";

@Table
class LikeUserVideo extends Model {
  @ForeignKey(() => User)
  @Index({
    unique: true,
    name: "like-user-video-unique",
  })
  @Column(DataType.INTEGER)
  userId: number;
}

export default LikeUserVideo;
