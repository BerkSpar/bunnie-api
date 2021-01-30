import { Router } from 'express';
import database from './database/index';

import Auth from './app/middlewares/auth';

import PostController from './app/controllers/PostController';
import CommentController from './app/controllers/CommentController';
import UserController from './app/controllers/UserController';
import AnimeController from './app/controllers/AnimeController';
import CollectionController from './app/controllers/CollectionController';

const routes = new Router();

routes.get('/', (req, res) => {
  try {
    database.connection.authenticate().then(() => {
      res.send('Connection has been established successfully.');
    });
  } catch (error) {
    res.send('Unable to connect to the database:', error);
  }
});
routes.get('/info', (req, res) => res.send('Bunnie API'));

routes.post('/users/signin', UserController.signIn);

//Users
routes.get('/users');
routes.post('/users', UserController.store);
routes.get('/users/:user_id');
routes.put('/users/:user_id');
routes.delete('/users/:user_id');

//Post
routes.get('/post');
routes.post('/post', Auth.verify, PostController.store);
routes.get('/post/:post_id');
routes.put('/post/:post_id');
routes.delete('/post/:post_id');

//Comments
routes.get('/posts/:post_id/comments');
routes.post('/posts/:post_id/comments', Auth.verify, CommentController.store);
routes.get('/posts/:post_id/comments/:comment_id');
routes.put('/posts/:post_id/comments/:comment_id');
routes.delete('/posts/:post_id/comments/:comment_id');

//Anime
routes.get('/animes');
routes.post('/animes', Auth.verify, AnimeController.store);
routes.put('/animes/:anime_id', Auth.verify, AnimeController.update);
routes.delete('/animes/:anime_id');

//Collection
routes.get('/collections');
routes.post('/collections', Auth.verify, CollectionController.store);
routes.put('/collections/:collection_id');
routes.delete('/collections/:collection_id');

export default routes;
