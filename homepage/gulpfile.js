const gulp = require("gulp");
const browserSync = require("browser-sync");
const plumber = require("gulp-plumber");
const reload = browserSync.reload;
const sass = require("gulp-sass");
const sourcemaps = require("gulp-sourcemaps");
const notify = require("gulp-notify");
const rename = require("gulp-rename");
const htmlreplace = require("gulp-html-replace");
const clean = require("gulp-clean");
const htmlmin = require("gulp-htmlmin");

const onError = function(err) {
  notify.onError({
    title: "gulp error in " + err.plugin,
    message: err.toString(),
  })(err);
  this.emit("end");
};

gulp.task("sass", function() {
  return gulp.src("scss/main.scss")
  .pipe(plumber({errorHandler: onError}))
  .pipe(sourcemaps.init())
  .pipe(sass())
  .pipe(sourcemaps.write())
  .pipe(gulp.dest("css"))
  .pipe(reload({stream: true}));
});

gulp.task("default", gulp.series("sass", function startServer() {
  browserSync({
    server: true,
  });

  gulp.watch(["scss/*.scss"], gulp.series("sass"));
  gulp.watch(["*.html"], gulp.series("html_reload"));
}));

gulp.task("html_reload", function() {
  return gulp.src("index.html")
  .pipe(reload({stream: true}));
});

// build tools

gulp.task("build_html", function() {
  return gulp.src("index.html")
  .pipe(htmlreplace({
    "css": "css/all.min.css",
    "js": "js/main.min.js"
  }))
  .pipe(htmlmin({collapseWhitespace: true}))
  .pipe(gulp.dest("../docs"));
});

gulp.task("build_sass", function() {
  return gulp.src("scss/main.scss")
  .pipe(rename("all.min.scss"))
  .pipe(sourcemaps.init())
  .pipe(sass({outputStyle: "compressed"}))
  .pipe(sourcemaps.write("./"))
  .pipe(gulp.dest("../docs/css"));
});

gulp.task("build_favicon", function() {
  return gulp.src("favicon.png")
  .pipe(gulp.dest("../docs"));
});


gulp.task("clean", function() {
  gulp.src("../docs/index.html", {allowEmpty: true})
  .pipe(clean({force: true}));
  return gulp.src("../docs/css", {allowEmpty: true})
  .pipe(clean({force: true}));
});

gulp.task("build", gulp.series("clean",
  gulp.parallel("build_html", "build_sass", "build_favicon")
));
