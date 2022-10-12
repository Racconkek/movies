import express from 'express';
import authorizedMiddleware from '../passport/authorizedMiddleware';
import User from '../database/models/user';
import Movie from '../database/models/movie';
import { Op } from 'sequelize';
import Tag from '../database/models/tag';

export default function (app: express.Router): void {
  const router = express.Router();
  app.use('/tags', router);

  router.post('/', authorizedMiddleware, async function (req, res) {
    try {
      const { name, color } = req.body;

      const user = req.user as User;
      const createdTag = await Tag.create({
        authorId: user.id,
        author: user,
        name: name,
        color: color,
      });

      const tag = await Tag.findOne({
        where: {
          [Op.and]: [
            {
              name: {
                [Op.ne]: '',
              },
              id: createdTag.id,
            },
          ],
        },
        include: ['author'],
      });

      if (!tag) {
        return res.sendStatus(404);
      }

      res.json(tag);
    } catch (e) {
      console.log('Ошибка в процессе преобразования', e);
    }
  });

  router.get('/', authorizedMiddleware, async function (req, res) {
    const tags = await Tag.findAll({
      include: ['author'],
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

    res.json(tags);
  });

  router.delete('/:tagId', authorizedMiddleware, async function (req, res) {
    try {
      const userId = (req.user as User).id;
      const { tagId } = req.params;

      const tag = await Tag.findOne({
        where: {
          authorId: userId,
          id: tagId,
        },
      });

      if (!tag) {
        return res.sendStatus(401);
      }

      await tag.destroy();

      res.json(tag);
    } catch (e) {
      console.log(e);
      res.sendStatus(400);
    }
  });
}
