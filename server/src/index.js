import 'babel-polyfill';

// load express app
import app from './app.js';
import {logger} from './logger';

import connect from './db.js';

// Connect to db
connect();

// run server
const port = process.env.PORT || 9000;
app.listen(port, function(){
  logger.info(`Magic happens on port: ${port}`);
});
