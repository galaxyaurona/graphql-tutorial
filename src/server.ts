import * as express from 'express';

const app = express();

app.get('/', function (_: express.Request, res: express.Response) {
  res.send('Hello World');
});

app.listen(3000);
