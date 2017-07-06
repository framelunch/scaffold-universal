import dotenv from 'dotenv';
dotenv.config();

const { PORT } = process.env;

export default {
  dest: {
    dev: '.tmp',
    build: 'build',
  },

  copy: {
    static: ['src/*.*'],
    assets: ['src/assets/**/*'],
  },

  view: {
    src: ['src/views/**/*.ejs', '!src/views/**/_*'],
    watch: ['src/views/**/*.ejs'],
    rename(path) {
      if (path.basename !== 'index') {
        let basename = 'index';
        let dirname = `${path.dirname}/`;

        dirname += path.basename.split('.').reduce((str, item) => {
          if (item.charAt(0) === '$') {
            basename = item.substr(1);
          } else {
            str += `${item}/`;
          }
          return str;
        }, '');

        path.basename = basename;
        path.dirname = dirname;
      }
    },
  },

  style: {
    src: ['src/styles/**/*.css', '!src/styles/**/_*'],
    watch: ['src/styles/**/*.css']
  },

  script: {
    src: ['src/scripts/**/*.{js,jsx}', '!src/scripts/**/_*'],
    watch: {
      app: [
        'src/*.{js,jsx}',
        'src/api/**/*', 'src/app/**/*', 'src/auth/**/*', 'src/config/**/*',
        'src/libs/**/*', 'src/models/**/*'
      ],
      script: ['src/scripts/**/*']
    }
  },

  browser: {
    proxy: `http://localhost:${PORT}`,
    port: PORT-1,
    notify: false,
    reloadDebounce: 500
  },

  nodemon: {
    script: '.tmp/server/server.build.js',
    ext: 'js',
    ignore: [],
    execMap: {
      js: "node --harmony"
    },
    watch: ['.tmp/server']
  }
};
