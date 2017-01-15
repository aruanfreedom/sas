var gulp = require('gulp');
var sass = require('gulp-sass');
var imagemin = require('gulp-imagemin');
var htmlmin = require('gulp-htmlmin');
var csso = require('gulp-csso');
var minify = require('gulp-minify');
var bundle = require('gulp-bundle-assets');
var concatCss = require('gulp-concat-css');

gulp.task('bundleJs', function() {
    return gulp.src('./bundle.config.js')
        .pipe(bundle())
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('bundleCss', function () {
    return gulp.src(['css/one-page-scroll.css', 'css/openlayer.css'])
        .pipe(concatCss("css/bundle.css"))
        .pipe(csso())
        .pipe(gulp.dest('dist'));
});

// Js minify
gulp.task('js', function() {
    gulp.src(['js/*.js', 'node_modules/jquery/dist/jquery.min.js'])
        .pipe(minify())
        .pipe(gulp.dest('dist/js'))
});

// MINIFY  HTML
gulp.task('html', function() {
    return gulp.src('*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('dist'));
});

// Image optimisation
gulp.task('img', function() {
    return gulp.src('img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'));
});

// Css minify
gulp.task('css', function () {
    return gulp.src(['./css/kaz-style.css', './css/style.css'])
        .pipe(csso())
        .pipe(gulp.dest('./dist/css'));
});

// Sass
gulp.task('sass', function() {
  return gulp.src(['./scss/style.scss', './scss/kaz-style.scss'])
      .pipe(sass({
          outputStyle: 'compressed',
          includePaths: ['node_modules/susy/sass']
      }).on('error', sass.logError))
      .pipe(gulp.dest('css/'));
});

gulp.task('sass:w', function () {
  gulp.watch(['./scss/style.scss', './scss/kaz-style.scss'], ['sass']);
});

gulp.task('default', ['html', 'img', 'bundleJs', 'bundleCss']);
