import { Sequelize } from "sequelize-typescript";
import LikeUserVideo from "./models/likeUserVideo";
import Comment from "./models/comment";
import User from "./models/user";

export default async function (): Promise<void> {
    const sequelize = new Sequelize(process.env.DB_URI)
  // const sequelize = new Sequelize({
  //   database: process.env.DB_USER,
  //   dialect: "postgres",
  //   username: process.env.DB_USER,
  //   password: process.env.DB_PASSWORD,
  //   host: process.env.DB_HOST,
  // });
    try {
        await sequelize.authenticate()
        console.log('Соединение с БД было успешно установлено')
    } catch (e) {
        console.log('Невозможно выполнить подключение к БД: ', e)
        throw e;
    }
    sequelize.addModels([User]);
    await User.sync();


  // await LikeUserVideo.create({ userId: 2, videoId: 1 });
  // await LikeUserVideo.create({ userId: 2, videoId: 2 });

  // const user1 = await User.findOne({
  //   where: { id: 1 },
  //   include: ["likedVideos"],
  // });
  // const user2 = await User.findOne({
  //   where: { id: 2 },
  //   include: ["likedVideos"],
  // });
  // const video1 = await Video.findOne({ where: { id: 1 } });
  // const video2 = await Video.findOne({
  //   where: { id: 2 },
  //   include: ["usersWhoLike"],
  // });

  // console.log(video2.usersWhoLike);
}
