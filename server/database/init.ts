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
  // await Tag.create({ authorId: 1, name: 'Ужасы', color: '#D9D9D9' });
  // await Tag.create({ authorId: 1, name: 'Боевик', color: '#F7C0C0' });
  // await Tag.create({ authorId: 1, name: 'Драма', color: '#BFEDF0' });
  // await Tag.create({ authorId: 1, name: 'Мелодрама', color: '#FFC9ED' });
  // await Tag.create({ authorId: 1, name: 'Комедия', color: '#FDFFAE' });
  // await Tag.create({ authorId: 1, name: 'Научная фантастика', color: '#EBB4FF' });
  // await Tag.create({ authorId: 1, name: 'Фэнтези', color: '#FFE7AA' });
  // await Tag.create({ authorId: 1, name: 'Детектив', color: '#C6C8FE' });
  // await Tag.create({ authorId: 1, name: 'Трагедия', color: '#DFCCF1' });
  // await Tag.create({ authorId: 1, name: 'Приключения', color: '#C5F2BE' });
}
