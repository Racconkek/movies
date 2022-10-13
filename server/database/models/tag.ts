import {
  AllowNull,
  AutoIncrement, BelongsTo, BelongsToMany,
  Column,
  DataType, Default,
  ForeignKey,
  Index,
  Model, PrimaryKey,
  Table
} from "sequelize-typescript";
import User from "./user";
import Movie from "./movie";
import { MoviesTags } from "./moviesTags";

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

  @BelongsToMany(() => Movie, () => MoviesTags)
  movies!: Movie[];
}

export default Tag;
