import app from './app';

app.listen(process.env.PORT || 3333, () => {
  console.log(`Server listening at port ${process.env.PORT || 3333}`);
});
