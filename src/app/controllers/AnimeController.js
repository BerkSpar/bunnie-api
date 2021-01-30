import * as Yup from 'yup';
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

    const anime = await Anime.findByPk(id);

    await anime.update({
      current_episode,
      status,
      note,
    });

    return res
      .status(200)
      .json({ message: 'anime entry updated successfully' });
  }
}

export default new AnimeController();
