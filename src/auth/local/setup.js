import passport from 'passport';
import { Strategy } from 'passport-local';
import User from '../../models/User';

export default function () {
  passport.use(new Strategy({
    usernameField: 'email',
    passwordField: 'password', // this is the virtual field on the model
  }, (email, password, done) => {
    User.findOne({
      email: email.toLowerCase(),
    }, (err, user) => {
      if (err) return done(err);

      if (!user) {
        return done(null, false, { message: 'This email is not registered.' });
      }
      if (!user.emailActivate) {
        return done(null, false, { message: 'This email is not activated.' });
      }

      if (!user.authenticate(password)) {
        return done(null, false, { message: 'This password is not correct.' });
      }

      return done(null, user);
    });
  }));
}
