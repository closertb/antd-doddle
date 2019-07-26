const gulp = require('gulp');
const babel = require('gulp-babel');
const clean = require('del');
const ts = require('gulp-typescript');

const tsProject = ts.createProject('./tsconfig.json');

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
  return gulp.src('./package/**/*.less')
    .pipe(gulp.dest('./lib'));
});

// 复制less模块到es
gulp.task('lessToEs', () => {
  return gulp.src('./packages/**/*.less')
    .pipe(gulp.dest('./es'));
});

// gulp ts转js
gulp.task('ts', function () {
  return tsProject.src()
      .pipe(tsProject())
      .js.pipe(gulp.dest('dist'));
});

// babel 打包es模块
gulp.task('lib', gulp.series('clean', () => {
  return gulp.src('./packages/**/*.js')
    .pipe(gulp.dest('./lib'));
}, 'lessToLib'));

// babel 打包成支持es6模块的语法
// 配置modules: false，保留es6模块化语法
gulp.task('es', gulp.series('cleanEs', () => {
  return gulp.src('./packages/**/*.js')
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
  return gulp.src('./packages/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('./lib'));
}, 'lessToLib'));

gulp.task('default', gulp.parallel(['lib', 'es']));

gulp.task('ts', function() {
  return tsProject.src()
    .pipe(tsProject())
    .pipe(gulp.dest('tsDist'));
});
