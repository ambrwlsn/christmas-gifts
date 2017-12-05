const gulp = require("gulp");
const sass = require("gulp-sass");

const browserSync = require("browser-sync").create();

gulp.task("serve", ["js", "templates", "sass"], function() {
  browserSync.init({
    server: {
      baseDir: "./public"
    }
  });

  gulp.watch("./sass/**/*.scss", ["sass"]);
  gulp.watch("./js/**/*.js", ["js"]);
  // gulp.watch("./src/img/**", ["images"]);
  // gulp.watch("./src/fonts/**", ["fonts"]);
  // gulp.watch("./src/templates/**/*.html", ["templates"]);
  gulp.watch("./templates/index.html", ["templates"]);
});

gulp.task("sass", function() {
  return gulp
    .src("./sass/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("./public/css"))
    .pipe(browserSync.stream());
});

gulp.task("js", function() {
  return gulp
    .src("./js/*.js")
    .pipe(gulp.dest("./public/js"))
    .pipe(browserSync.stream());
});

// gulp.task("images", function() {
//   return gulp
//     .src("./src/img/**")
//     .pipe(gulp.dest("./public/img"))
//     .pipe(browserSync.stream());
// });

// gulp.task("fonts", function() {
//   return gulp
//     .src("./src/fonts/**")
//     .pipe(gulp.dest("./public/fonts"))
//     .pipe(browserSync.stream());
// });

// gulp.task("templates", function() {
//   return gulp
//     .src("./src/templates/*.html")
//     .pipe(gulp.dest("./public"))
//     .pipe(browserSync.stream());
// });

gulp.task("templates", function() {
  return gulp
    .src("./templates/index.html")
    .pipe(gulp.dest("./public"))
    .pipe(browserSync.stream());
});
