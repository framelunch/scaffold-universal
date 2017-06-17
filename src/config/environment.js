import path from 'path';
import _ from 'lodash';

const root = path.join(process.cwd(), 'src');
const { NODE_ENV, PORT, SEED, DOMAIN } = process.env;

const base = {
  root,
  env: NODE_ENV || 'development',
  port: PORT || 8080,
  seedDB: SEED === 'true' || false,
  mail: 'ikeda@framelunch.jp',
  lang: 'ja',
  userRoles: ['guest', 'user', 'admin'], // 配列の順番で権限の序列がある

  session: {
    secrets: 'scaffold-universal',
    expire: 60 * 60 * 24 * 7,
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
