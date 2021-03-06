import gulp from 'gulp';
import plumber from 'gulp-plumber';
import sourcemaps from 'gulp-sourcemaps';
import postcss from 'gulp-postcss';
import customProperties from 'postcss-custom-properties';
import nested from 'postcss-nested';
import importCss from 'postcss-import';
import customMedia from 'postcss-custom-media';
import flexbugsFixes from 'postcss-flexbugs-fixes';
import nthChildFix from 'postcss-nth-child-fix';
import url from 'postcss-url';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';

import conf from '../config';

const urlOptions = [
  { filter: ['./**/*'], url: 'inline' },
];

gulp.task('style', () => (
  gulp.src(conf.style.src)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(postcss([
      importCss,
      customProperties,
      customMedia,
      nested,
      flexbugsFixes,
      nthChildFix,
      url(urlOptions),
      autoprefixer,
    ]))
    .pipe(gulp.dest(`${conf.dest.dev}/css`))
));

gulp.task('b.style', () => (
  gulp.src(conf.style.src)
    .pipe(postcss([
      importCss,
      customProperties,
      customMedia,
      nested,
      flexbugsFixes,
      nthChildFix,
      autoprefixer({ browsers: browserslist }),
      cssnano,
    ]))
    .pipe(gulp.dest(`${conf.dest.build}/css`))
));
