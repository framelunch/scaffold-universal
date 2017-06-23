import express from 'express';
import favicon from 'serve-favicon';
import morgan from 'morgan';
import compression from 'compression';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import cookieParser from 'cookie-parser';
import path from 'path';
import config from './index';

const { NODE_ENV } = process.env;
const { root } = config;

export default app => {
  app.set('view engine', 'ejs');
  app.set('views', path.join(root, 'views'));

  app.use(compression());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(cookieParser());

  app.use(express.static(path.join(root, 'assets')));
  app.use(favicon(path.join(root, 'favicon.ico')));

  if (NODE_ENV === 'production') {
    app.use(morgan('combined'));
  } else {
    app.use(express.static('.tmp'));
    app.use(morgan('dev'));
  }
};
