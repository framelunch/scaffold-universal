import React from 'react';
// import { renderToString } from 'react-dom/server';
import { renderToString } from 'react-router-server';
import { StaticRouter, matchPath } from 'react-router-dom';
import Routes, { routes } from './app/Routes';

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
    .get(async (req, res) => {
      const match = routes.reduce((acc, route) => matchPath(req.url, route.path, { exact: true }) || acc, null);

      if (!match) {
        // no matching route
        res.status(404);
        return;
      }
      const matchRoute = routes.filter(({ path }) => path === match.path)[0];
      if (matchRoute.component.fetchData) {
        // 初期化データ取得処理あり
        const appState = await matchRoute.component.fetchData({ urlHeader: 'http://localhost:9077' });
        console.log(appState);

        const context = {};
        const component = await renderToString(
          <StaticRouter location={req.url} context={context}>
            <Routes {...appState} />
          </StaticRouter>,
        );

        return res.render('_app', { component: component.html, appState: JSON.stringify(appState) });
      }

      // 初期化データ取得処理なし
      const context = {};
      const component = await renderToString(
        <StaticRouter location={req.url} context={context}>
          <Routes />
        </StaticRouter>,
      );

      return res.render('_app', {
        component: component.html,
        appState: JSON.stringify({ data: 'testtesttest', a: 22 }),
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
