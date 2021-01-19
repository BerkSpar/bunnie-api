import Sequelize, { Model } from 'sequelize';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        last_name: Sequelize.STRING,
        mobile: Sequelize.STRING,
        username: Sequelize.STRING,
        email: Sequelize.STRING,
        password_hash: Sequelize.STRING,
        registered_at: Sequelize.DATE,
        last_login: Sequelize.DATE,
        bio: Sequelize.STRING,
        public: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default User;
