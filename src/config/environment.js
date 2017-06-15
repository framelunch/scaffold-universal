import path from 'path';

const root = path.normalize(`${__dirname}/..`);
const { NODE_ENV, PORT, SEED, DOMAIN } = process.env;

const base = {
  root,
  env: NODE_ENV || 'development',
  port: PORT || 8080,
  seedDB: SEED === 'true' || false,
  mail: 'ikeda@framelunch.jp',
  lang: 'ja',
  userRoles: ['guest', 'user', 'admin'], // 配列の順番で権限の序列がある

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
    session: {},
  },
  test: {},
  production: {},
};

export default Object.assign(base, configs[NODE_ENV] || {});
