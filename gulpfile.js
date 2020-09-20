// thanks to Jerome Coupé for this guide to upgrading Gulp from 3.9.1 to 4.0.2
// https://www.webstoemp.com/blog/switching-to-gulp4/

'use strict';

// Load plugins
const browsersync = require('browser-sync').create();
const gulp = require('gulp');
const sass = require('gulp-sass');

// BrowserSync
function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: './public/'
    },
    port: 3000
  });
  done();
}

// BrowserSync Reload
function browserSyncReload(done) {
  browsersync.reload();
  done();
}

// CSS task
function css() {
  return gulp
    .src('./src/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/css'))
    .pipe(browsersync.stream());
}

// JS task
function scripts() {
  return gulp
    .src('./src/js/**/*.js')
    .pipe(gulp.dest('./public/js'))
    .pipe(browsersync.stream());
}

// Fonts task
function fonts() {
  return gulp
    .src('./src/fonts/**')
    .pipe(gulp.dest('./public/fonts'))
    .pipe(browsersync.stream());
}

// Templates task
function templates() {
  return gulp
    .src('./src/templates/*.html')
    .pipe(gulp.dest('./public/'))
    .pipe(browsersync.stream());
}

// Watch files
function watchFiles() {
  gulp.watch('./src/sass/**/*.scss', sass);
  gulp.watch('./src/js/**/*.js', js);
  gulp.watch('./src/templates/**/*.html', templates);
  gulp.watch('./src/fonts/**', fonts);
}

// define complex tasks
const js = gulp.series(scripts);
const build = gulp.series(gulp.parallel(css, fonts, templates, js));
const watch = gulp.parallel(watchFiles, browserSync);

// export tasks
exports.css = css;
exports.js = js;
exports.build = build;
exports.watch = watch;
exports.default = build;
