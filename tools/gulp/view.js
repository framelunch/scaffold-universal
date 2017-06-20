import gulp from 'gulp';
import plumber from 'gulp-plumber';
import ejs from 'gulp-ejs';
import rename from 'gulp-rename';
import minifyHtml from 'gulp-minify-html';
import conf from '../config';

gulp.task('view', () => (
  gulp.src(conf.view.src)
    .pipe(plumber())
    .pipe(ejs(null, {}, { ext: '.html' }))
    .pipe(rename(conf.view.rename))
    .pipe(gulp.dest(conf.dest.dev))
));

gulp.task('b.view', () => (
  gulp.src(conf.view.src)
    .pipe(ejs(null, {}, { ext: '.html' }))
    .pipe(minifyHtml())
    .pipe(rename(conf.view.rename))
    .pipe(gulp.dest(conf.dest.build))
));
