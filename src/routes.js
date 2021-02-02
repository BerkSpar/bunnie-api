/* eslint-disable prettier/prettier */
import { Router } from 'express';

import Auth from './app/middlewares/auth';

import PostController from './app/controllers/PostController';
import CommentController from './app/controllers/CommentController';
import UserController from './app/controllers/UserController';
import AnimeController from './app/controllers/AnimeController';
import CollectionController from './app/controllers/CollectionController';

const routes = new Router();

routes.get('/', (req, res) => {
  res.sendFile('/pages/index.html', { root: __dirname });
});

routes.post('/user/signin', UserController.signIn);

//Users
routes.post('/user', UserController.store);
routes.put('/user', Auth.verify, UserController.update);
routes.get('/user/:user_id', Auth.verify, UserController.find);

//Post
routes.get('/posts');
routes.post('/posts', Auth.verify, PostController.store);
routes.get('/posts/:post_id', Auth.verify, PostController.find);
routes.put('/posts/:post_id', Auth.verify, PostController.update);
routes.delete('/posts/:post_id', Auth.verify, PostController.delete);

//Comments
routes.get('/posts/:post_id/comments', Auth.verify, CommentController.index);
routes.post('/posts/:post_id/comments', Auth.verify, CommentController.store);
routes.get('/posts/:post_id/comments/:comment_id', Auth.verify, CommentController.find);
routes.put('/posts/:post_id/comments/:comment_id', Auth.verify, CommentController.update);
routes.delete('/posts/:post_id/comments/:comment_id', Auth.verify, CommentController.delete);

//Anime
routes.get('/animes', Auth.verify, AnimeController.index);
routes.post('/animes', Auth.verify, AnimeController.store);
routes.get('/animes/:anime_id', Auth.verify, AnimeController.find);
routes.put('/animes/:anime_id', Auth.verify, AnimeController.update);
routes.delete('/animes/:anime_id', Auth.verify, AnimeController.delete);

//Collection
routes.get('/collections', Auth.verify, CollectionController.index);
routes.post('/collections', Auth.verify, CollectionController.store);
routes.get('/collections/:collection_id', Auth.verify, CollectionController.find);
routes.put('/collections/:collection_id', Auth.verify, CollectionController.update);
routes.delete('/collections/:collection_id', Auth.verify, CollectionController.delete);

export default routes;
