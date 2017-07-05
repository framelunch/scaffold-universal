import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router-dom';
import serialize from 'serialize-javascript';
import Routes, { getRoutes } from './routes';

export default (req, res) => {
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
};
