import express from 'express';
import passport from 'passport';
import { signToken } from '../auth.service';

const router = express.Router();

router.post('/', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    err = err || info;
    if (err) return res.status(401).json(err);
    if (!user) return res.status(404).json(info);
    res.status(200).json({ token: signToken(user._id, user.role) });
  })(req, res, next);
});

router.get('/:token', (req, res) => {
  res.render('token.ejs', { token: req.params.token, type: req.query.type });
});

export default router;
