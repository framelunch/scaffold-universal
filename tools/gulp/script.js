import gulp from 'gulp';
import plumber from 'gulp-plumber';
import webpack from 'webpack';
import webpackStream from 'webpack-stream';
import browser from 'browser-sync';
import conf from '../config';
import confDevelopment from '../webpack/development';
import confProduction from '../webpack/production';

gulp.task('script', () => (
  plumber()
    .pipe(webpackStream(confDevelopment, webpack))
    .pipe(gulp.dest(`${conf.dest.dev}/js`))
    .pipe(browser.reload({stream: true}))
));

gulp.task('b.script', () => (
  webpackStream(confProduction, webpack)
    .pipe(gulp.dest(`${conf.dest.build}/js`))
));
