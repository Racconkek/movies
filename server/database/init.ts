import { Sequelize } from 'sequelize-typescript';
import Like from './models/like';
import Comment from './models/comment';
import User from './models/user';
import Movie from './models/movie';
import Tag from './models/tag';
import { MoviesTags } from "./models/moviesTags";

export default async function (): Promise<void> {
  const sequelize = new Sequelize(process.env.DB_URI);
  try {
    await sequelize.authenticate();
    console.log('Соединение с БД было успешно установлено');
  } catch (e) {
    console.log('Невозможно выполнить подключение к БД: ', e);
    throw e;
  }
  sequelize.addModels([Comment, User, Movie, Like, Tag, MoviesTags]);
  await sequelize.sync({ force: false });

  // await Tag.sync({ force: true });
  // await Tag.create({ authorId: 1, name: 'Ужосы', color: '#A09DA1' });
  // await Tag.create({ authorId: 1, name: 'Боевик', color: '#ef979e' });
  // await Tag.create({ authorId: 1, name: 'Драма', color: '#97ecef' });
  // await Tag.create({ authorId: 1, name: 'Мелодрама', color: '#ef97e8' });
  // await Tag.create({ authorId: 1, name: 'Комедия', color: '#e3dd7f' });
  // await Tag.create({ authorId: 1, name: 'Научная фантастика', color: '#a47fe3' });
  // await Tag.create({ authorId: 1, name: 'Фэнтези', color: '#98e37f' });
  // await Tag.create({ authorId: 1, name: 'Детектив', color: '#476294' });
  // await Tag.create({ authorId: 1, name: 'Трагедия', color: '#8c4794' });
  // await Tag.create({ authorId: 1, name: 'Приключенческий', color: '#e5c089' });
  // await LikeUserVideo.create({ userId: 2, videoId: 2 });
}
