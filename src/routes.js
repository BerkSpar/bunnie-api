import { Router } from 'express';
import database from './database/index';

import PostController from './app/controllers/PostController';
import CommentController from './app/controllers/CommentController';
import UserController from './app/controllers/UserController';

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

//Users
routes.get('/users');
routes.post('/users', UserController.store);
routes.get('/users/:user_id');
routes.put('/users/:user_id');
routes.delete('/users/:user_id');

//Post
routes.get('/post');
routes.post('/post', PostController.store);
routes.get('/post/:post_id');
routes.put('/post/:post_id');
routes.delete('/post/:post_id');

//Comments
routes.get('/posts/:post_id/comments');
routes.post('/posts/:post_id/comments', CommentController.store);
routes.get('/posts/:post_id/comments/:comment_id');
routes.put('/posts/:post_id/comments/:comment_id');
routes.delete('/posts/:post_id/comments/:comment_id');

//Anime
routes.get('/animes');
routes.post('/animes');
routes.put('/animes/:anime_id');
routes.delete('/animes/:anime_id');

//Collection
routes.get('/collections');
routes.post('/collections');
routes.put('/collections/:collection_id');
routes.delete('/collections/:collection_id');

export default routes;
