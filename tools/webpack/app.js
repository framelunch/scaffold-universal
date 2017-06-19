import ExtractTextPlugin from 'extract-text-webpack-plugin';
import UglifyJs from 'uglifyjs-webpack-plugin';
import base from './_base';

const entry = { app: './src/app/app.jsx' };

export const development = Object.assign({}, base, {
  entry,
  cache: true,
  devtool: 'inline-source-map',
  plugins: [
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
    new ExtractTextPlugin({
      filename: 'css/[name].css',
      allChunks: true
    }),
    new UglifyJs(),
  ]
});
