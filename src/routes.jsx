import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import Routes from './app/Routes';

export default (app) => {
  app.use((req, res) => {
    const context = {};
    const component = renderToString(
      <StaticRouter location={req.url} context={context}>
        <Routes />
      </StaticRouter>);

    return res.render('index', { component, appState: JSON.stringify({ data: 'testtesttest', a: 22 }) });
  });
};
