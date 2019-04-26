import * as cors from 'cors';
import * as express from 'express';
import { addGraphQL } from './graphql';

const { PORT = 4000 } = process.env;

const app = express();
app.use(cors({origin: true}));

app.get('/', function (_, res: express.Response) {
  res.send('Hello World');
});

addGraphQL(app, '/graphql');

app.listen(PORT, () =>
  console.log(`🚀 Server ready at http://localhost:${PORT}`)
);
