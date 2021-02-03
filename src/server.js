import app from './app';
import database from './database';

app.listen(process.env.PORT || 3333, () => {
  console.log(`Server listening at port ${process.env.PORT || 3333}`);

  try {
    database.connection.authenticate().then(() => {
      console.log('Connection has been established successfully.');
    });
  } catch (error) {
    console.log('Unable to connect to the database:', error);
  }
});
