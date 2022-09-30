import { Sequelize } from "sequelize-typescript";
import Like from "./models/like";
import Comment from "./models/comment";
import User from "./models/user";
import Movie from "./models/movie";

export default async function (): Promise<void> {
    const sequelize = new Sequelize(process.env.DB_URI)
    try {
        await sequelize.authenticate()
        console.log('Соединение с БД было успешно установлено')
    } catch (e) {
        console.log('Невозможно выполнить подключение к БД: ', e)
        throw e;
    }
    sequelize.addModels([Comment, User, Movie, Like]);
    await sequelize.sync({ force: true });
}
