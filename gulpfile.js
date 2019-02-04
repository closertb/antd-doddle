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
    .pipe(gulp.dest('./lib'));
}));

// babel 打包成支持es6模块的语法
// 配置modules: false，保留es6模块化语法
gulp.task('esModule', gulp.series('cleanEs', () => {
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
}));