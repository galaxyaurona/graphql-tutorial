import * as express from 'express';
import { addGraphQL } from './graphql';

const app = express();
const port = 4000;

app.get('/', function (_: express.Request, res: express.Response) {
  res.send('Hello World');
});

addGraphQL(app, '/graphql');

app.listen({ port }, () =>
  console.log(`🚀 Server ready at http://localhost:${port}`)
);
