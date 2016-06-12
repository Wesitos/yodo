import express from 'express';

import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import {parseJWT} from './auth.js';

const app = express();

app.use(bodyParser());

app.use(cookieParser());

app.use(compression());

app.use(parseJWT);

//Routes

import donator from './controllers/donator.js';
import receptor from './controllers/receptor.js';
import bank from './controllers/bank.js';
import login from './controllers/login.js';

app.use('/api/donator', donator);
app.use('/api/receptor', receptor);
app.use('/api/login', login);


export default app;
