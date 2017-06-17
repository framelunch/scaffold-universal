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
    watch: ['src/**/*.{js,jsx}']
  },

  browser: {
    proxy: 'http://localhost:9078',
    port: 9077,
    notify: false,
    reloadDebounce: 500
  },

  nodemon: {
    script: '.tmp/server.build.js',
    ext: 'js',
    ignore: ['node_modules', 'tools', 'deploy', 'src', '.tmp/js'],
    execMap: {
      js: "node --harmony"
    },
    env: {
      NODE_ENV: 'development',
      PORT: 9078,
      DOMAIN: 'http://localhost:9077'
    },
    watch: ['.tmp']
  }
};
