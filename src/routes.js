import ssr from './app/ssr';
import error from './helpers/error';
import user from './api/user';
import auth from './auth';

export default app => {
  app.use('/api/users', user);
  app.use('/auth', auth);

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|assets|js|css)/*')
    .all(error[404]);

  app.route('/*')
    .get(ssr)
    .all(error[404]);

  app.use((err, req, res, next) => {
    if (err) {
      error[505](err, req, res);
      next(err);
    }
  });
};
