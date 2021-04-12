import * as Yup from 'yup';
import { Op } from 'sequelize';

import Collection from '../models/collection';
import CollectionItem from '../models/collectionitem';

class CollectionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      image_url: Yup.string().required(),
      name: Yup.string().required(),
      description: Yup.string().notRequired(),
      is_public: Yup.boolean().required(),
      animes: Yup.array()
        .of(
          Yup.object().shape({
            mal_id: Yup.string().required(),
            order: Yup.number().required(),
            note: Yup.string().notRequired(),
          })
        )
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ message: 'validation error' });
    }

    var { image_url, name, description, is_public, animes } = req.body;

    animes.map((anime) => {
      anime.collection_id = 1;
      return anime;
    });

    const collection = await Collection.create({
      user_id: req.user_id,
      image_url,
      name,
      description,
      is_public,
    });

    animes = animes.map((anime) => {
      anime.collection_id = collection.id;
      return anime;
    });

    await CollectionItem.bulkCreate(animes);

    const result = collection.toJSON();
    result.animes = animes;

    return res.status(200).json(result);
  }

  async index(req, res) {
    const collections = await Collection.findAll({
      where: { user_id: req.user_id },
    });

    return res.status(200).json(collections);
  }

  async delete(req, res) {
    const id = req.params.collection_id;

    if (!id) {
      return res.status(400).json({ message: 'validation error' });
    }

    const collection = await Collection.findOne({
      where: {
        [Op.and]: [{ id }, { user_id: req.user_id }],
      },
    });

    if (!collection) {
      return res.status(404).json({ message: 'collection not found' });
    }

    await collection.destroy();

    return res.status(200).json({ message: 'collection deleted successfully' });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      image_url: Yup.string().required(),
      name: Yup.string().required(),
      description: Yup.string().notRequired(),
      is_public: Yup.boolean().required(),
      animes: Yup.array()
        .of(
          Yup.object().shape({
            mal_id: Yup.string().required(),
            order: Yup.number().required(),
            note: Yup.string().notRequired(),
          })
        )
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ message: 'validation error' });
    }

    var { image_url, name, description, is_public, animes } = req.body;
    const id = req.params.collection_id;

    const collection = await Collection.findOne({
      where: {
        [Op.and]: [{ id }, { user_id: req.user_id }],
      },
    });

    if (!collection) {
      return res.status(404).json({ message: 'collection not found' });
    }

    const items = await CollectionItem.findAll({
      where: { collection_id: id },
    });

    items.map(async (item) => {
      await item.destroy();
    });

    await collection.update({
      user_id: req.user_id,
      image_url,
      name,
      description,
      is_public,
    });

    animes = animes.map((anime) => {
      anime.collection_id = collection.id;
      return anime;
    });

    const result = collection.toJSON();
    result.animes = animes;

    await CollectionItem.bulkCreate(animes);

    return res.status(200).json(result);
  }

  async find(req, res) {
    const collection_id = req.params.collection_id;

    if (!collection_id) {
      return res.status(400).json({ message: 'validation error' });
    }

    let collection = await Collection.findByPk(collection_id);

    if (!collection) {
      return res.status(404).json({ message: 'collection not found' });
    }

    const animes = await CollectionItem.findAll({ where: { collection_id } });

    const result = collection.toJSON();
    result.animes = animes;

    return res.status(200).json(result);
  }
}

export default new CollectionController();
