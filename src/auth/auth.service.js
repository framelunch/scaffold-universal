import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';
import compose from 'composable-middleware';
import User from '../models/User';
import config from '../config/environment';

const validateJwt = expressJwt({ secret: config.session.secrets });

/**
 * Attaches the user object to the request if authenticated
 * Otherwise returns 403
 */
export function verify() {
  return compose()
    .use((req, res, next) => {
      // allow access_token to be passed through query parameter as well
      if (req.query && Object.prototype.hasOwnProperty.call(req.query, 'access_token')) {
        req.headers.authorization = `Bearer ${req.query.access_token}`;
      }
      validateJwt(req, res, next);
    })
    .use((err, req, res, next) => {
      if (err) return res.status(401).send(err.name);
      next(req, res, next);
    });
}
export function isAuthenticated() {
  return compose()
    .use(verify())
    .use((req, res, next) => {
      User.findById(req.user._id, (err, user) => {
        if (err) return next(err);
        if (!user) return res.sendStatus(401);

        req.user = user;
        next();
      });
    });
}

/**
 * Checks if the user role meets the minimum requirements of the route
 */
export function hasRole(roleRequired) {
  if (!roleRequired) throw new Error('Required role needs to be set');
  return compose()
    .use(isAuthenticated())
    .use((req, res, next) => {
      if (config.userRoles.indexOf(req.user.role) >= config.userRoles.indexOf(roleRequired)) {
        next();
      } else {
        res.sendStatus(403);
      }
    });
}

/**
 * For activation, to change email
 */
export function sign(obj, expire) {
  return jwt.sign(
    obj,
    config.session.secrets,
    { expiresIn: expire || config.session.expire },
  );
}

/**
 * Returns a jwt token signed by the app secret
 */
export function signToken(id, role) {
  /**
   * Tokenに有効期限を持たせないようにしている
   */
  return jwt.sign(
    { _id: id, role },
    config.session.secrets,
    { expiresIn: config.session.expire },
  );
}

/**
 * Set token cookie directly for oAuth strategies
 */
export function setTokenCookie(req, res) {
  if (!req.user) {
    return res.status(404).json({ message: 'Something went wrong, please try again.' });
  }
  res.cookie(config.cookie.token, signToken(req.user._id, req.user.role));
  res.redirect(config.session.redirect);
}
