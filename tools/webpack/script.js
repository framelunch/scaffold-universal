import path from 'path';
import globby from 'globby';
import webpack from 'webpack';
import UglifyJs from 'uglifyjs-webpack-plugin';
import conf from '../config';

const entry = {};

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
            cacheDirectory: true,
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
  entry: ((_entry) => {
    const newEntry = Object.assign({}, _entry);
    newEntry.vendor = (_entry.vendor || []).concat(['babel-polyfill']);
    return newEntry;
  })(entry),
  cache: false,
  devtool: '',
  plugins: [
    new webpack.LoaderOptionsPlugin({ debug: false }),
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': "'production'" }),
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'js/vendor.script.js' }),
    new UglifyJs(),
  ]
});
