import Sequelize, { Model } from 'sequelize';

class Anime extends Model {
  static init(sequelize) {
    super.init(
      {
        user_id: Sequelize.INTEGER,
        mal_id: Sequelize.INTEGER,
        name: Sequelize.STRING,
        current_episode: Sequelize.INTEGER,
        total_episodes: Sequelize.INTEGER,
        status: Sequelize.STRING,
        note: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Anime;
