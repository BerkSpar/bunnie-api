import express from 'express';
import routes from './routes';

const app = express();

app.use(express.json());
app.use(express.static(__dirname + '/pages/images'));
app.use(routes);

export default app;
