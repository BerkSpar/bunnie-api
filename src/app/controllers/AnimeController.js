import * as Yup from 'yup';
import { Op } from 'sequelize';

import Anime from '../models/anime';

class AnimeController {
  async store(req, res) {
    const schema = Yup.object().shape({
      mal_id: Yup.string().required(),
      name: Yup.string().required(),
      current_episode: Yup.number().required(),
      status: Yup.string().required(),
      note: Yup.string().notRequired(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ message: 'validation error' });
    }

    const { mal_id, name, current_episode, status, note } = req.body;

    //TODO: Get total_episodes from API

    await Anime.create({
      user_id: req.user_id,
      mal_id,
      name,
      current_episode,
      total_episodes: 10,
      status,
      note,
    });

    return res.status(200).json({ message: 'anime entry added successfully' });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      current_episode: Yup.number().required(),
      status: Yup.string().required(),
      note: Yup.string().notRequired(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ message: 'validation error' });
    }

    const { current_episode, status, note } = req.body;
    const id = req.params.anime_id;

    const anime = await Anime.findOne({
      where: {
        [Op.and]: [{ id }, { user_id: req.user_id }],
      },
    });

    if (!anime) {
      return res.status(404).json({ message: 'anime entry not found' });
    }

    await anime.update({
      current_episode,
      status,
      note,
    });

    return res
      .status(200)
      .json({ message: 'anime entry updated successfully' });
  }

  async delete(req, res) {
    const id = req.params.anime_id;

    if (!id) {
      return res.status(400).json({ message: 'validation error' });
    }

    const anime = await Anime.findOne({
      where: {
        [Op.and]: [{ id }, { user_id: req.user_id }],
      },
    });

    if (!anime) {
      return res.status(404).json({ message: 'anime entry not found' });
    }

    await anime.destroy();

    return res
      .status(200)
      .json({ message: 'anime entry deleted successfully' });
  }

  async index(req, res) {
    const animes = await Anime.findAll({ where: { user_id: req.user_id } });

    return res.status(200).json(animes);
  }

  async find(req, res) {
    const anime_id = req.params.anime_id;

    const anime = await Anime.findOne({
      where: {
        [Op.and]: { id: anime_id, user_id: req.user_id },
      },
    });

    if (!anime) {
      return res.status(404).json({ message: 'anime entry not found' });
    }

    return res.status(200).json(anime);
  }
}

export default new AnimeController();
