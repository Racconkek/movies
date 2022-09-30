import {
  Column,
  DataType,
  ForeignKey,
  Index,
  Model,
  Table,
} from "sequelize-typescript";
import User from "./user";
import Movie from "./movie";

@Table
class Like extends Model {
  @ForeignKey(() => User)
  @Index({
    unique: true,
    name: "like-user-movie-unique",
  })
  @Column(DataType.INTEGER)
  userId: number;

  @ForeignKey(() => Movie)
  @Index({
    unique: true,
    name: "like-user-movie-unique",
  })
  @Column(DataType.INTEGER)
  movieId: number;
}

export default Like;
