const gulp = require('gulp');
const babel = require('gulp-babel');
const clean = require('del');

/* eslint-disable */
gulp.task('clean', () => {
  return clean(['lib']);
});
gulp.task('default', gulp.series('clean', () => {
  return gulp.src('./src/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('./lib'));
}));