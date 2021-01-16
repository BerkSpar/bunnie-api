'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Anime extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Anime.init({
    user_id: DataTypes.INTEGER,
    mal_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    current_episode: DataTypes.INTEGER,
    total_episodes: DataTypes.INTEGER,
    status: DataTypes.STRING,
    note: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Anime',
  });
  return Anime;
};