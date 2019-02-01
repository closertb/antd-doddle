const gulp = require('gulp');
const babel = require('gulp-babel');
const clean = require('del');

/* eslint-disable */
gulp.task('clean', () => {
  return clean(['lib']);
});

/* eslint-disable */
gulp.task('cleanEs', () => {
  return clean(['es']);
});

// babel 打包es模块
gulp.task('default', gulp.series('clean', () => {
  return gulp.src('./src/**/*.js')
    .pipe(babel())
    .pipe(babel())
    .pipe(gulp.dest('./lib'));
}));

// babel 打包成支持es6模块的语法
gulp.task('esModule', gulp.series('cleanEs', () => {
  return gulp.src('./src/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('./es'));
}));