import * as express from 'express';
import { addGraphQL } from './graphql';

const app = express();

app.get('/', function (_: express.Request, res: express.Response) {
  res.send('Hello World');
});

const graphqlServer = addGraphQL(app, '/graphql');

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${graphqlServer.graphqlPath}`)
);
