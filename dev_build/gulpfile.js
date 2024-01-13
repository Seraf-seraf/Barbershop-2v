const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const sass = require("gulp-dart-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const csso = require("postcss-csso");
const rename = require("gulp-rename");
const htmlmin = require("gulp-htmlmin");
const terser = require("gulp-terser");
const squoosh = require("gulp-libsquoosh");
const webp = require("gulp-webp");
const sync = require("browser-sync");
const del = require('del');

// Styles

const styles = () => {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer(),
      csso()
    ]))
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(sync.stream());
}

exports.styles = styles;

// Clean

const clean = () => {
  return del('build')
}

exports.clean = clean;

// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: "build"
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

const reload = (done) => {
  sync.reload();
  done();
}

exports.reload = reload;

//  HTML

const html = () => {
  return gulp.src('*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('build'));
}

exports.html = html;

// JavaScript

const scripts = () => {
  return gulp.src("source/js/*.js")
    .pipe(terser())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('build/js'))
    .pipe(sync.stream());
}

exports.scripts = scripts;

//Images

const optimizeImages = () => {
  return gulp.src('source/images/**/*.{jpg,png,svg,webp}')
    .pipe(squoosh())
    .pipe(gulp.dest('build/images'))
}

exports.optimizeImages = optimizeImages;

const copyImages = () => {
  return gulp.src('source/images/**/*.{jpg,png,svg,webp}')
    .pipe(gulp.dest('build/images'))
}

exports.copyImages = copyImages;

// Webp

const createWebp = () => {
  return gulp.src(['source/images/photo-works/*.jpg', 'source/images/reviews-author/*.jpg'])
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest(function(file) {
      if (file.path.includes('photo-works')) {
        return 'build/images/photo-works';
      } else if (file.path.includes('reviews-author')) {
        return 'build/images/reviews-author';
      }
    }))
}

exports.createWebp = createWebp;

const copy = (done) => {
  gulp.src([
    'source/fonts/*.{woff,woff2}',
    'source/favicon/*.*'
  ], {
    base: 'source'
  })
    .pipe(gulp.dest('build'))
  done();
}

exports.copy = copy;

// Watcher

const watcher = () => {
  gulp.watch('source/sass/**/*.scss', gulp.series(styles));
  gulp.watch('source/js/*.js', gulp.series(scripts));
  gulp.watch('*.html', gulp.series(html, reload));
}

// Build

const build = gulp.series(
  clean,
  copy,
  optimizeImages,
  gulp.parallel(
    styles,
    html,
    scripts,
    createWebp
  )
);

exports.build = build;

// Default

exports.default = gulp.series(
  clean,
  copy,
  copyImages,
  gulp.parallel(
    styles,
    html,
    scripts,
    createWebp
  ),
  gulp.series(
    server,
    watcher
  ));
