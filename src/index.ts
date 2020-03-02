import 'reflect-metadata';
import 'source-map-support/register';

import { globalCatchOnPromiseRejection } from './util/catch-promise-rejection';
import { connectDatabase } from './database';
import { initServer } from './server';

globalCatchOnPromiseRejection();
connectDatabase()
  .then(initServer)
  .catch(console.log);
