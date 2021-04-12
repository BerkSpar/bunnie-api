import Sequelize from 'sequelize';

import databaseConfig from '../config/database';

import Entry from '../app/models/entry';
import Collection from '../app/models/collection';
import CollectionItem from '../app/models/collectionitem';
import Message from '../app/models/message';
import Post from '../app/models/post';
import PostComment from '../app/models/postcomment';
import User from '../app/models/user';
import UserFollow from '../app/models/userfollow';
import UserFriend from '../app/models/userfriend';

const models = [
  Entry,
  Collection,
  CollectionItem,
  Message,
  Post,
  PostComment,
  User,
  UserFollow,
  UserFriend,
];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models.forEach((model) => model.init(this.connection));
  }
}

export default new Database();
