import app from './app';
import config from './src/config/config';

const PORT = config.PORT;

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
