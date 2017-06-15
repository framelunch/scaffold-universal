export default {
  dest: {
    dev: '.tmp',
    build: 'build',
  },

  copy: {
    static: ['src/*.*'],
    assets: ['src/assets/**/*'],
  },

  style: {
    src: ['src/styles/**/*.css', '!src/styles/**/_*'],
    watch: ['src/styles/**/*.css', 'src/modules/**/*.css']
  },

  script: {
    src: ['src/scripts/**/*.{js,jsx}', '!src/scripts/**/_*'],
    watch: ['src/scripts/**/*', 'src/components/**/*', 'src/modules/**/*.{js,jsx}', 'src/libs/**/*.js']
  },

  browser: {
    proxy: 'http://localhost:9078',
    port: 9077,
    notify: false,
    reloadDebounce: 500
  },

  nodemon: {
    script: 'src/server.js',
    ext: 'js jsx ejs',
    ignore: ['node_modules', 'tools', 'deploy', 'app'],
    execMap: {
      js: "babel-node --debug --presets env,react --inspect"
    },
    env: {
      NODE_ENV: 'development',
      PORT: 9078,
      DOMAIN: 'http://localhost:9078'
    }
  }
};
