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

// 复制less模块到lib
gulp.task('lessToLib', () => {  
  return gulp.src('./src/**/*.less')
    .pipe(gulp.dest('./lib'));
});

// 复制less模块到es
gulp.task('lessToEs', () => {
  return gulp.src('./src/**/*.less')
    .pipe(gulp.dest('./es'));
});
// babel 打包es模块
gulp.task('lib', gulp.series('clean', () => {
  return gulp.src('./src/**/*.js')
    .pipe(gulp.dest('./lib'));
}, 'lessToLib'));

// babel 打包成支持es6模块的语法
// 配置modules: false，保留es6模块化语法
gulp.task('es', gulp.series('cleanEs', () => {
  return gulp.src('./src/**/*.js')
    .pipe(babel({
      babelrc: false,
      presets: [
        ["@babel/preset-env", { "modules": false }],
        "@babel/preset-react",
      ],
      plugins: [
        "@babel/plugin-proposal-object-rest-spread",
        ["@babel/plugin-proposal-decorators", { "legacy": true }],
        "@babel/plugin-proposal-class-properties",
        "@babel/plugin-transform-classes"
      ]
    }))
    .pipe(gulp.dest('./es'));
}, 'lessToEs'));

// 发布打包
gulp.task('lib', gulp.series('clean', () => {
  return gulp.src('./src/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('./lib'));
}, 'lessToLib'));

gulp.task('default', gulp.parallel(['lib', 'es']));