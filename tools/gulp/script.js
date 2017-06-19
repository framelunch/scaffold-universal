import gulp from 'gulp';
import plumber from 'gulp-plumber';
import webpack from 'webpack';
import webpackStream from 'webpack-stream';
import browser from 'browser-sync';
import conf from '../config';

import * as confScript from '../webpack/script';
import * as confApp from '../webpack/app';
import * as confServer from '../webpack/server';

gulp.task('script', () => (
  plumber()
    .pipe(webpackStream(confScript.development, webpack))
    .pipe(gulp.dest(`${conf.dest.dev}`))
    .pipe(browser.reload({stream: true}))
));
gulp.task('script.app', () => (
  plumber()
    .pipe(webpackStream(confApp.development, webpack))
    .pipe(gulp.dest(`${conf.dest.dev}`))
));
gulp.task('script.server', () => (
  plumber()
    .pipe(webpackStream(confServer.development, webpack))
    .pipe(gulp.dest(`${conf.dest.dev}`))
));


gulp.task('b.script', () => (
  webpackStream(confScript.production, webpack)
    .pipe(gulp.dest(`${conf.dest.build}/js`))
));
