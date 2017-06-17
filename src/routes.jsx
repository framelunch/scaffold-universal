import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import Routes from './app/routes';

import errors from './errors';
import user from './api/user';
import auth from './auth';

export default (app) => {
  app.use('/api/users', user);
  app.use('/auth', auth);

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|assets|js|css)/*')
    .all(errors[404]);

  app.route('/*')
    .get((req, res) => {
      const context = {};
      const component = renderToString(
        <StaticRouter location={req.url} context={context}>
          <Routes />
        </StaticRouter>);

      return res.render('_app', { component, appState: JSON.stringify({ data: 'testtesttest', a: 22 }) });
    })
    .all(errors[404]);

  app.use((err, req, res, next) => {
    if (err) {
      errors[505](err, req, res);
      next(err);
    }
  });
};
