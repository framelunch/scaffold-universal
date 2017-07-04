import path from 'path';
import globby from 'globby';
import webpack from 'webpack';
import UglifyJs from 'uglifyjs-webpack-plugin';
import conf from '../config';
import { browserslist } from '../../package.json';

const entry = {
  vendor: ['jquery', 'animejs']
};

globby.sync(conf.script.src)
  .forEach((filename) => {
    const basename = path.basename(filename, path.extname(filename));
    entry[basename] = `./${filename}`;
  });

const base = {
  output: {
    filename: 'js/[name].js'
  },
  resolve: {
    modules: [
      'node_modules',
    ],
    extensions: ['.jsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['env', {
                targets: { browsers: browserslist },
                useBuiltIns: true,
                modules: process.env.NODE_ENV === 'production' ? false : 'commonjs',
                debug: process.env.NODE_ENV === 'development'
              }]
            ],
            plugins: [
              'transform-object-rest-spread'
            ],
            cacheDirectory: true,
            babelrc: false
          },
        },
      }
    ],
  },
};

export const development = Object.assign({}, base, {
  entry,
  cache: true,
  devtool: 'inline-source-map',
  plugins: [
    new webpack.LoaderOptionsPlugin({ debug: true }),
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'js/vendor.script.js' }),
  ]
});

export const production = Object.assign({}, base, {
  entry,
  cache: false,
  devtool: '',
  plugins: [
    new webpack.LoaderOptionsPlugin({ debug: false }),
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': "'production'" }),
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'js/vendor.script.js' }),
    new UglifyJs(),
  ]
});
