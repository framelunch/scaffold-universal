import fs from 'fs';
import path from 'path';
import webpack from 'webpack';
import UglifyJs from 'uglifyjs-webpack-plugin';

const externals = (() => {
  const result = {};

  fs.readdirSync('node_modules')
    .filter(x => ['.bin'].indexOf(x) === -1)
    .forEach(mod => (result[mod] = `commonjs ${mod}`));

  return result;
})();

const base = {
  entry: [
    'babel-polyfill',
    path.join(__dirname, '../../src/server'),
  ],
  output: {
    filename: 'server/server.build.js',
    sourceMapFilename: 'server/server.build.map'
  },
  target: 'node',
  resolve: {
    modules: ['node_modules'],
    extensions: ['.jsx', '.js']
  },
  externals,
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['env', { debug: process.env.NODE_ENV === 'development' }],
              'react'
            ],
            plugins: [
              'transform-object-rest-spread',
              'transform-class-properties',
              [
                "css-modules-transform",
                {
                  "generateScopedName": "[name]-[local]-[hash:base64:5]",
                  "extensions": [".css"]
                }
              ]
            ],
            cacheDirectory: true,
            babelrc: false
          }
        }
      },
      {
        test: /\.(jpg|png|gif|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: '[name].[ext]'
          }
        }
      }
    ]
  }
};

export const development = Object.assign({}, base, {
  cache: true,
  plugins: [
    new webpack.BannerPlugin({ banner: 'require("source-map-support").install();', raw: true, entryOnly: false })
  ],
  devtool: 'source-map'
});

export const production = Object.assign({}, base, {
  cache: false,
  devtool: '',
  plugins: [
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': "'production'" }),
    new UglifyJs(),
  ]
});
