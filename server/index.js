import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import path from 'path';

import indexRoute from './routes/index.route';
import featuredProjectRoute from './routes/featured-project.route';

import baseContent from '../src/content/base.json';

export const model = {
  copyright: `&copy; ${new Date().getFullYear()} Alan Eicker`,
  ...baseContent,
};

const app = express();
const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV;

const staticPath = path.join(__dirname, '..', 'public');
const viewsPath = path.join(__dirname, '..', 'src/views');

app.set('view engine', 'vash');
app.set('views', viewsPath);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(compression());
app.use(cors());
app.use(express.static(staticPath));

app.use('/', indexRoute);
app.use('/', featuredProjectRoute)

app.listen(port, () => {
  console.log('App listening on port:', port);
});