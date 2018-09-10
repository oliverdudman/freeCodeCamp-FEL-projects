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
const envify = require("envify/custom");
const htmlreplace = require("gulp-html-replace");
const clean = require("gulp-clean");
const htmlmin = require("gulp-htmlmin");
const exorcist = require("exorcist");

const onError = function(err) {
  notify.onError({
    title: "gulp error in " + err.plugin,
    message: err.toString(),
  })(err);
  this.emit("end");
};

gulp.task("eslint", function() {
  return gulp.src("src/js/src/main.js")
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError())
  .on("error", onError);
});

gulp.task("sass", function() {
  return gulp.src("src/scss/main.scss")
  .pipe(plumber({errorHandler: onError}))
  .pipe(sourcemaps.init())
  .pipe(sass())
  .pipe(sourcemaps.write())
  .pipe(gulp.dest("src/css"))
  .pipe(reload({stream: true}));
});

gulp.task("browserify", function() {
  return browserify("src/js/src/main.js")
  .transform("babelify", {presets: ["@babel/preset-env", "@babel/preset-react"]})
  .bundle()
  .pipe(source("main.js"))
  .pipe(gulp.dest("src/js/build"))
  .pipe(reload({stream: true}));
});

gulp.task("default", gulp.series("sass", "browserify", "eslint", function startServer() {
  browserSync({
    server: "src",
  });

  gulp.watch(["src/scss/*.scss"], gulp.series("sass"));
  gulp.watch(["src/index.html"], reload);
  gulp.watch(["src/js/src/*.js"], gulp.parallel("browserify", "eslint"));
}));

// build tools

gulp.task("build_html", function() {
  return gulp.src("src/index.html")
  .pipe(htmlreplace({
    "css": "css/all.min.css",
    "js": "js/main.min.js"
  }))
  .pipe(htmlmin({collapseWhitespace: true}))
  .pipe(gulp.dest("dist"));
});

gulp.task("build_sass", function() {
  return gulp.src("src/scss/main.scss")
  .pipe(rename("all.min.scss"))
  .pipe(sourcemaps.init())
  .pipe(sass({outputStyle: "compressed"}))
  .pipe(sourcemaps.write("./"))
  .pipe(gulp.dest("dist/css"));
});

gulp.task("build_js", function() {
  return browserify("src/js/src/main.js", {debug: true})
  .transform("babelify", {presets: ["@babel/preset-env", "@babel/preset-react"]})
  .transform({global: true}, envify({NODE_ENV: "production"}))
  .transform("uglifyify", {global: true})
  .bundle()
  .pipe(exorcist("dist/js/main.min.map.js"))
  .pipe(source("main.min.js"))
  .pipe(gulp.dest("dist/js"));
});

gulp.task("clean", function() {
  return gulp.src("dist", {allowEmpty: true})
  .pipe(clean());
});

gulp.task("build", gulp.series("clean",
  gulp.parallel("build_html", "build_sass", "build_js"))
);
