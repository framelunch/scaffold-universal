import path from 'path';
import _ from 'lodash';

const root = path.join(process.cwd(), 'src');
const { DOMAIN, MONGODB_URI } = process.env;

const base = {
  root,
  userRoles: ['guest', 'user', 'admin'], // 配列の順番で権限の序列がある

  session: {
    secrets: 'scaffold-universal',
    expire: 60 * 60 * 24 * 7,
  },

  // Mongo
  mongo: {
    uri: MONGODB_URI,
    options: {
      db: { safe: true },
    },
  },

  // SNS
  facebook: {
    clientID: '',
    clientSecret: '',
    callbackURL: `${DOMAIN}/auth/facebook/callback`,
  },

  twitter: {
    clientID: '',
    clientSecret: '',
    callbackURL: `${DOMAIN}/auth/twitter/callback`,
  },

  google: {
    clientID: '',
    clientSecret: '',
    callbackURL: `${DOMAIN}/auth/google/callback`,
  },
};

const configs = {
  development: {
    session: {
      expire: 60 * 60 * 24,
    },
  },
  test: {},
  production: {},
};

export default _.merge(base, configs.development);
