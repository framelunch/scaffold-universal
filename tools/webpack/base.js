import globby from 'globby';
import path from 'path';
import customProperties from 'postcss-custom-properties';
import nested from 'postcss-nested';
import importCss from 'postcss-import';
import autoprefixer from 'autoprefixer';
import conf from '../config';
import { browserslist } from '../../package.json';

const babelOptions = {
  presets: [
    ['env', {
      targets: { browsers: browserslist },
      debug: process.env.NODE_ENV === 'development'
    }],
    'react'
  ],
  plugins: [
    'transform-object-rest-spread'
  ],
  cacheDirectory: true,
  babelrc: false
};

const entry = {
  vendor: [
    'babel-polyfill',
    'react',
    'react-dom',
    'react-router-dom',
    'redux',
  ],
};

globby.sync(conf.script.src)
  .forEach((filename) => {
    const basename = path.basename(filename, path.extname(filename));
    entry[basename] = `./${filename}`;
  });

export default {
  entry,
  output: {
    filename: '[name].js',
    sourceMapFilename: '[name].map', //inline-source-mapの時は特に必要ないが一応
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
          options: babelOptions
        },
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              localIdentName: '[name]-[local]-[hash:base64:5]',
              modules: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: (loader) => [
                customProperties,
                nested,
                importCss({root: loader.resourcePath}),
                autoprefixer
              ]
            }
          }
        ]
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
    ],
  },
};
