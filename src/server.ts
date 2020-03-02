import * as cors from 'cors';
import * as express from 'express';
import { addGraphQL } from './graphql';

export const initServer = (): void => {
  const port: number = +process.env['PORT'] || 4000;
  const app = express();
  app.use(cors({origin: true}));

  app.get('/', function (_, res: express.Response) {
    res.send('Hello from GraphQL');
  });

  addGraphQL(app, '/graphql');

  app.listen({ port }, () =>
    console.log(`🚀 Server ready at http://localhost:${port}`),
  );
};
