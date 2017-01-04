const gulp = require('gulp');
const sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');
const csso = require('gulp-csso');
const minify = require('gulp-minify');

// Js minify
gulp.task('js', function() {
    gulp.src('js/*.js', 'node_modules/jquery/dist/jquery.min.js')
        .pipe(minify({
            ext:{
                src:'-debug.js',
                min:'.js'
            },
            exclude: ['tasks'],
            ignoreFiles: ['.combo.js', '-min.js']
        }))
        .pipe(gulp.dest('dist'))
});

// MINIFY  HTML
gulp.task('html', function() {
    return gulp.src('index.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('dist'));
});

// Image optimisation
gulp.task('img', function() {
    return gulp.src('img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'));
});

// Css minify
gulp.task('css', function () {
    return gulp.src('./css/*.css')
        .pipe(csso())
        .pipe(gulp.dest('./dist/css'));
});

// Sass
gulp.task('sass', function() {
  return gulp.src('scss/*.scss')
      .pipe(sass({
          outputStyle: 'compressed',
          includePaths: ['node_modules/susy/sass']
      }).on('error', sass.logError))
      .pipe(gulp.dest('css/'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./scss/*.scss', ['sass']);
});

gulp.task('default', ['js', 'css', 'html', 'img']);