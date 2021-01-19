import Sequelize, { Model } from 'sequelize';

class PostComment extends Model {
  static init(sequelize) {
    super.init(
      {
        user_id: Sequelize.INTEGER,
        post_id: Sequelize.INTEGER,
        content: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default PostComment;
