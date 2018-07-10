const gulp = require("gulp");
const babel = require("gulp-babel");
const browserSync = require("browser-sync");
// const concat = require("gulp-concat");
// const eslint = require("gulp-eslint");
// const filter = require("gulp-filter");
// const newer = require("gulp-newer");
// const plumber = require("gulp-plumber");
const reload = browserSync.reload;
const sass = require("gulp-sass");
const browserify = require("browserify");
const source = require("vinyl-source-stream");
// const sourcemaps = require("gulp-sourcemaps");

// const onError = function(err) {
//   notify.onError({
//     title: "Error",
//     message: "<%= error %>",
//   })(err);
//   this.emit("end");
// };
//
// const plumberOptions = {
//   errorHandle: onError,
// };
//
// const jsFiles = {
//   vendor: [
//
//   ],
//   source: [
//     "js/src/main.js",
//   ]
// };

gulp.task("sass", function() {
  return gulp.src("scss/main.scss")
  .pipe(sass())
  .pipe(gulp.dest("css"))
  .pipe(reload({stream: true}));
});

gulp.task("browserify", function() {
  return browserify("js/src/main.js")
  .transform("babelify", {presets: ["@babel/preset-env", "@babel/preset-react"]})
  .bundle()
  .pipe(source("main.js"))
  .pipe(gulp.dest("js/build"))
  .pipe(reload({stream: true}));
});

gulp.task("default", ["sass", "browserify", "eslint"], function() {
  browserSync({
    server: true,
  });

  gulp.watch(["scss/*.scss"], ["sass"]);
  gulp.watch(["index.html"], reload);
  gulp.watch(["js/src/main.js"], ["browserify", "eslint"]);
})
