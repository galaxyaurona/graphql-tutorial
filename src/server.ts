// tslint:disable-next-line:no-import-side-effect
import 'reflect-metadata';

import * as cors from 'cors';
import * as express from 'express';
import { addGraphQL } from './graphql';
import { globalCatchOnPromiseRejection } from './util/catch-promise-rejection';

const { PORT = 4000 } = process.env;

globalCatchOnPromiseRejection();

const app = express();
app.use(cors({origin: true}));

app.get('/', function (_, res: express.Response) {
  res.send('Hello World');
});

addGraphQL(app, '/graphql');

app.listen(PORT, () =>
  console.log(`🚀 Server ready at http://localhost:${PORT}`)
);
