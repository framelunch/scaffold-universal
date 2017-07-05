import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router-dom';
import serialize from 'serialize-javascript';

import Routes, { getRoutes } from './app/routes';
import errors from './components/errors';
import user from './api/user';
import auth from './auth';

export default app => {
  app.use('/api/users', user);
  app.use('/auth', auth);

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|assets|js|css)/*')
    .all(errors[404]);

  app.route('/*')
    .get((req, res) => {
      const initialState = { top: 'SSR state', users: { isFetched: false, data: [] } };
      const routes = getRoutes();

      const fetches = routes.reduce((docs, route) => {
        const match = matchPath(req.url, route);
        if (match && route.component.fetchData) {
          docs.push(route.component.fetchData({ urlHeader: process.env.DOMAIN }).then(data => (
            new Promise(resolve => {
              initialState[route.key] = { data, isFetched: true };
              resolve();
            })
          )));
        }
        return docs;
      }, []);

      Promise.all(fetches).then(() => {
        const context = {};
        const component = renderToString(
          <StaticRouter location={req.url} context={context}>
            <Routes initialState={initialState} />
          </StaticRouter>);

        return res.render('_app', {
          component,
          appState: serialize(initialState),
        });
      });
    })
    .all(errors[404]);

  app.use((err, req, res, next) => {
    if (err) {
      errors[505](err, req, res);
      next(err);
    }
  });
};
