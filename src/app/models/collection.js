import Sequelize, { Model } from 'sequelize';

class Collection extends Model {
  static init(sequelize) {
    super.init(
      {
        user_id: Sequelize.INTEGER,
        image_url: Sequelize.STRING,
        name: Sequelize.STRING,
        description: Sequelize.STRING,
        public: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Collection;
