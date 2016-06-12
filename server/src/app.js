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


export default app;
