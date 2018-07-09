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

gulp.task("babel", function() {
  return gulp.src("js/src/main.js")
  .pipe(babel({"plugins": ["transform-react-jsx"]}))
  .pipe(gulp.dest("js/build"))
  .pipe(reload({stream: true}));
})

gulp.task("default", ["sass", "babel"], function() {
  browserSync({
    server: true,
  });

  gulp.watch(["scss/*.scss"], ["sass", "babel"]);
  gulp.watch(["index.html"], reload);
  gulp.watch(["js/src/main.js"], ["babel"]);
})
