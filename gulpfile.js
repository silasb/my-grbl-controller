var gulp = require('gulp');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var browserify = require('gulp-browserify');

gulp.task('jsx', function() {
  return gulp.src('src/app.jsx', {read: false})
    .pipe(plumber())
    .pipe(browserify({
      transform: ['reactify'],
      extensions: ['.jsx']
    }))
    .pipe(rename('app.js'))
    .pipe(gulp.dest('public/'));
});

gulp.task('css', function() {
  return gulp.src('src/style.css')
    .pipe(plumber())
    .pipe(rename('style.css'))
    .pipe(gulp.dest('public/'))
})

gulp.task('default', ['jsx', 'css'], function() {
  gulp.watch('src/**/*.jsx', ['jsx'])
  gulp.watch('src/**/*.css', ['css'])
})
