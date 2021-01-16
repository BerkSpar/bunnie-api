import { Router } from 'express';

const routes = new Router();

routes.get('/', (req, res) => res.send('Everything ok'));
routes.get('/info');

//Users
routes.get('/users');
routes.post('/users');
routes.get('/users/:user_id');
routes.put('/users/:user_id');
routes.delete('/users/:user_id');

//Post
routes.get('/post');
routes.post('/post');
routes.get('/post/:post_id');
routes.put('/post/:post_id');
routes.delete('/post/:post_id');

//Comments
routes.get('/posts/:post_id/comments');
routes.post('/posts/:post_id/comments');
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
