var gulp = require('gulp');
var rename = require('gulp-rename');
var browserify = require('gulp-browserify');

gulp.task('jsx', function() {
  return gulp.src('src/app.jsx', {read: false})
    .pipe(browserify({
      transform: ['reactify'],
      extensions: ['.jsx']
    }))
    .pipe(rename('app.js'))
    .pipe(gulp.dest('public/'));
});

gulp.task('default', ['jsx'], function() {
  gulp.watch('src/**/*.jsx', ['jsx'])
})
