import express from 'express';

import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';

const app = express();

app.use(bodyParser());

app.use(cookieParser());

app.use(compression());


export default app;
