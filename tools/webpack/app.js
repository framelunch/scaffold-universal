import webpack from 'webpack';
import customProperties from 'postcss-custom-properties';
import customMedia from 'postcss-custom-media';
import nested from 'postcss-nested';
import importCss from 'postcss-import';
import autoprefixer from 'autoprefixer';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import UglifyJs from 'uglifyjs-webpack-plugin';
import { browserslist } from '../../package.json';

const entry = {
  vendor: [
    'react',
    'react-dom',
    'react-redux',
    'react-router-dom',
    'redux',
    'redux-actions',
    'redux-observable',
    'isomorphic-fetch',
    'rxjs'
  ],
  app: './src/app/App.jsx'
};

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
  node: {
    process: false,
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
              }],
              'react',
              'flow'
            ],
            plugins: [
              'transform-class-properties',
              'transform-object-rest-spread'
            ],
            cacheDirectory: true,
            babelrc: false
          }
        },
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: [
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
                  importCss({root: loader.resourcePath}),
                  customProperties,
                  customMedia,
                  nested,
                  autoprefixer
                ]
              }
            }
          ]
        })
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
  }
};

export const development = Object.assign({}, base, {
  entry,
  cache: true,
  devtool: 'inline-source-map',

  plugins: [
    new webpack.LoaderOptionsPlugin({ debug: true }),
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'js/vendor.app.js' }),
    new ExtractTextPlugin({
      filename: 'css/[name].css',
      allChunks: true
    })
  ]
});

export const production = Object.assign({}, base, {
  entry,
  cache: false,

  plugins: [
    new webpack.LoaderOptionsPlugin({ debug: false }),
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': "'production'" }),
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'js/vendor.app.js' }),
    new ExtractTextPlugin({
      filename: 'css/[name].css',
      allChunks: true
    }),
    new UglifyJs(),
  ]
});
