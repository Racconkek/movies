import express from 'express';
import User from '../database/models/user';
import Movie from '../database/models/movie';
import authorizedMiddleware from '../passport/authorizedMiddleware';
import { Op } from 'sequelize';
import Like from '../database/models/like';
import Comment from '../database/models/comment';

export default function (app: express.Router): void {
  const router = express.Router();
  app.use('/movies', router);

  router.post('/', authorizedMiddleware, async function (req, res) {
    try {
      const { description, name } = req.body;

      const user = req.user as User;
      const createdMovie = await Movie.create({
        authorId: user.id,
        author: user,
        name: name,
        description: description,
      });

      const movie = await Movie.findOne({
        where: {
          [Op.and]: [
            {
              name: {
                [Op.ne]: '',
              },
              id: createdMovie.id,
            },
          ],
        },
        include: ['usersWhoLike', 'author', { association: 'comments', include: ['author'] }],
      });

      if (!movie) {
        return res.sendStatus(404);
      }

      res.json(movie);
    } catch (e) {
      console.log('Ошибка в процессе преобразования', e);
    }
  });

  router.get('/', authorizedMiddleware, async function (req, res) {
    const movies = await Movie.findAll({
      include: ['usersWhoLike', 'author', { association: 'comments', include: ['author'] }],
      where: {
        [Op.and]: [
          {
            name: {
              [Op.ne]: '',
            },
          },
        ],
      },
      order: [['id', 'ASC']],
    });

    res.json(movies);
  });

  router.get('/my', authorizedMiddleware, async function (req, res) {
    const userId = (req.user as User).id;

    try {
      const movies = await Movie.findAll({
        include: ['usersWhoLike', 'author', { association: 'comments', include: ['author'] }],
        where: {
          authorId: userId,
        },
        order: [['id', 'DESC']],
      });

      res.json(movies);
    } catch (e) {
      console.log(e);
      res.sendStatus(400);
    }
  });

  router.get('/favourites', authorizedMiddleware, async function (req, res) {
    const userId = (req.user as User).id;

    try {
      const { likedMovies } = await User.findOne({
        where: { id: userId },
        include: [
          {
            association: 'likedMovies',
            where: {
              [Op.and]: [
                {
                  name: {
                    [Op.ne]: '',
                  },
                },
              ],
            },
          },
        ],
      });

      res.json(likedMovies);
    } catch (e) {
      res.json([]);
    }
  });

  router.patch('/:movieId', authorizedMiddleware, async function (req, res) {
    const userId = (req.user as User).id;
    const { movieId: movieId } = req.params;

    const movie = await Movie.findOne({
      include: ['usersWhoLike', 'author', { association: 'comments', include: ['author'] }],
      where: {
        authorId: userId,
        id: movieId,
      },
    });

    if (!movie) {
      return res.sendStatus(401);
    }

    if (!req.body.name || !req.body.description) {
      return res.sendStatus(400);
    }

    movie.name = req.body.name;
    movie.description = req.body.description;
    await movie.save();

    res.json(movie);
  });

  router.delete('/:movieId', authorizedMiddleware, async function (req, res) {
    try {
      const userId = (req.user as User).id;
      const { movieId } = req.params;

      const movie = await Movie.findOne({
        where: {
          authorId: userId,
          id: movieId,
        },
      });

      if (!movie) {
        return res.sendStatus(401);
      }

      await movie.destroy();

      res.json(movie);
    } catch (e) {
      console.log(e);
      res.sendStatus(400);
    }
  });

  router.get('/:movieId', authorizedMiddleware, async (req, res) => {
    try {
      const { movieId } = req.params;

      const movie = await Movie.findOne({
        where: {
          [Op.and]: [
            {
              name: {
                [Op.ne]: '',
              },
              id: movieId,
            },
          ],
        },
        include: ['usersWhoLike', 'author', { association: 'comments', include: ['author'] }],
      });

      if (!movie) {
        return res.sendStatus(404);
      }

      res.json(movie);
    } catch (e) {
      console.log(e);
      res.sendStatus(400);
    }
  });

  router.post('/:movieId/toggleLike', authorizedMiddleware, async (req, res) => {
    const { movieId } = req.params;

    try {
      const user = req.user as User;

      const entry = await Like.findOne({
        where: {
          userId: user.id,
          movieId: +movieId,
        },
      });

      if (entry) {
        await entry.destroy();
      } else {
        await Like.create({
          movieId: +movieId,
          userId: user.id,
        });
      }

      const movie = await Movie.findOne({
        where: {
          id: movieId,
        },
        include: ['usersWhoLike', 'author', { association: 'comments', include: ['author'] }],
      });

      if (!movie) {
        res.sendStatus(404);
      }
      res.json(movie);
    } catch (e) {
      console.log(e);
      return res.sendStatus(400);
    }
  });

  router.post('/:movieId/comment', authorizedMiddleware, async (req, res) => {
    const { movieId } = req.params;
    const { text } = req.body;

    try {
      const user = req.user as User;

      const comment = await Comment.create({
        authorId: user.id,
        movieId: +movieId,
        text,
      });

      // const video = await Video.findOne({
      //   where: {
      //     id: videoId,
      //   },
      //   include: [
      //     "usersWhoLike",
      //     "author",
      //     { association: "comments", include: ["author"] },
      //   ],
      // });

      // if (!video) {
      //   res.sendStatus(404);
      // }

      const createdComment = await Comment.findOne({
        where: { id: comment.id },
        include: ['author'],
      });

      // sendToEveryoneWS({
      //   event: "newComment",
      //   data: createdComment,
      // });

      res.json(createdComment);
    } catch (e) {
      console.log(e);
      return res.sendStatus(400);
    }
  });
}
