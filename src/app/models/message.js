import Sequelize, { Model } from 'sequelize';

class Message extends Model {
  static init(sequelize) {
    super.init(
      {
        user_id: Sequelize.INTEGER,
        friend_id: Sequelize.INTEGER,
        text: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Message;
