import express from 'express';
import unless from 'express-unless';

import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import {parseJWT} from './auth.js';
import {middleware as logger} from './logger.js';

const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser());

app.use(cookieParser());

app.use(compression());

app.use(logger);
/*
app.use(parseJWT.unless({path: [
  '/api/login',
  {url: '/api/donator', methods: ['POST']},
]}));
*/

//Routes

import donator from './controllers/donator.js';
import receptor from './controllers/receptor.js';
import login from './controllers/login.js';
import logout from './controllers/logout.js';

app.use('/api/donator', donator);
app.use('/api/receptor', receptor);
app.use('/api/login', login);
app.use('/api/logout', logout);


export default app;
