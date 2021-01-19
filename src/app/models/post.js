import Sequelize, { Model } from 'sequelize';

class Post extends Model {
  static init(sequelize) {
    super.init(
      {
        user_id: Sequelize.INTEGER,
        content: Sequelize.STRING,
        image_url: Sequelize.STRING,
        likes: Sequelize.INTEGER,
        comments: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Post;
