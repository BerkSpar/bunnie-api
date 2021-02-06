import * as Yup from 'yup';
import { Op } from 'sequelize';

import Entry from '../models/entry';

class EntryController {
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

    const entry = await Entry.create({
      user_id: req.user_id,
      mal_id,
      name,
      current_episode,
      total_episodes: 10,
      status,
      note,
    });

    return res.status(200).json(entry);
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
    const id = req.params.entry_id;

    let entry = await Entry.findOne({
      where: {
        [Op.and]: [{ id }, { user_id: req.user_id }],
      },
    });

    if (!entry) {
      return res.status(404).json({ message: 'entry not found' });
    }

    entry = await entry.update({
      current_episode,
      status,
      note,
    });

    return res.status(200).json(entry);
  }

  async delete(req, res) {
    const id = req.params.entry_id;

    if (!id) {
      return res.status(400).json({ message: 'validation error' });
    }

    const entry = await Entry.findOne({
      where: {
        [Op.and]: [{ id }, { user_id: req.user_id }],
      },
    });

    if (!entry) {
      return res.status(404).json({ message: 'entry not found' });
    }

    await entry.destroy();

    return res.status(200).json({ message: 'entry deleted successfully' });
  }

  async index(req, res) {
    const entries = await Entry.findAll({ where: { user_id: req.user_id } });

    return res.status(200).json(entries);
  }

  async find(req, res) {
    const entry_id = req.params.entry_id;

    const entry = await Entry.findOne({
      where: {
        [Op.and]: { id: entry_id, user_id: req.user_id },
      },
    });

    if (!entry) {
      return res.status(404).json({ message: 'entry not found' });
    }

    return res.status(200).json(entry);
  }
}

export default new EntryController();
