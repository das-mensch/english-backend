import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import { registerRoutes } from './routes';
import { init } from './service/check';

const port = process.env.PORT || 80;
const app = express();

app.use(
  cors({
    origin: /localhost/,
  }),
);
app.use(bodyParser.text());
registerRoutes(app);

init()
  .then(() => {
    app.listen(port);
  })
  .catch((e) => {
    console.error('Could not initialise backend', e);
  });
