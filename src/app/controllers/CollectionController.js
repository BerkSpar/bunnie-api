import * as Yup from 'yup';
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

    //TODO: Get user id from auth header

    animes.map((anime) => {
      anime.collection_id = 1;
      return anime;
    });

    const collection = await Collection.create({
      user_id: 0,
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

    return res.status(200).json({ message: 'collection added successfully' });
  }
}

export default new CollectionController();
