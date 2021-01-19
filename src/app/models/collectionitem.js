import Sequelize, { Model } from 'sequelize';

class CollectionItem extends Model {
  static init(sequelize) {
    super.init(
      {
        collection_id: Sequelize.INTEGER,
        mal_id: Sequelize.INTEGER,
        order: Sequelize.INTEGER,
        note: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default CollectionItem;
