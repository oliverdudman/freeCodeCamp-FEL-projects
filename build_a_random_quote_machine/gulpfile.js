const gulp = require("gulp");
const browserSync = require("browser-sync");
const eslint = require("gulp-eslint");
const plumber = require("gulp-plumber");
const reload = browserSync.reload;
const sass = require("gulp-sass");
const browserify = require("browserify");
const source = require("vinyl-source-stream");
const sourcemaps = require("gulp-sourcemaps");
const notify = require("gulp-notify");
const rename = require("gulp-rename");

const onError = function(err) {
  notify.onError({
    title: "gulp error in " + err.plugin,
    message: err.toString(),
  })(err);
  this.emit("end");
};

gulp.task("eslint", function() {
  return gulp.src("js/src/main.js")
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError())
  .on("error", onError);
});

gulp.task("sass", function() {
  return gulp.src("scss/main.scss")
  .pipe(plumber({errorHandler: onError}))
  .pipe(sourcemaps.init())
  .pipe(sass())
  .pipe(sourcemaps.write())
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
  gulp.watch(["js/src/*.js"], ["browserify", "eslint"]);
});

gulp.task("build_sass", function() {
  return gulp.src("scss/main.scss")
  .pipe(rename("all.min.scss"))
  .pipe(sourcemaps.init())
  .pipe(sass({outputStyle: "compressed"}))
  .pipe(sourcemaps.write("./"))
  .pipe(gulp.dest("dist/css"));
});
