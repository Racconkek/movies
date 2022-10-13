import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import Movie from './movie';
import Tag from './tag';

@Table
export class MoviesTags extends Model {
  @ForeignKey(() => Movie)
  @Column(DataType.INTEGER)
  movieId: number;

  @ForeignKey(() => Tag)
  @Column(DataType.INTEGER)
  tagId: number;
}
