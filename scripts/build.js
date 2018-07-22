/**
 * 构建项目生成 dist ，根据传入的路径地址，按照 ICE page 的格则搜寻代码，并启动编译服务
 * @param {String} cwd 项目目录
 * @param {Object} options 命令行参数
 */

process.env.NODE_ENV = 'production';
const gulp = require('gulp');
const rimraf = require('rimraf');
const webpack = require('webpack');
const paths = require('./config/paths');
const entries = require('./config/entry');
const getWebpackConfigProd = require('./config/webpack.pro.config');
// const npmInstall = require('./helpers/npmInstall');

(function() {
  const cwd = process.cwd();
  // 指定构建的 entry
  // @TODO 可构建多页面
  // eslint-disable-next-line
  const packageData = require(paths.appPackageJson);
  const webpackConfig = getWebpackConfigProd(
    entries,
    paths
  );

  // build task
  gulp.task('build', ['clean'], () => {
    gulp.start(['webpack']);
  });

  gulp.task('clean', (done) => {
    rimraf(webpackConfig.output.path, done);
  });

  // gulp.task('install', () => {
  //   return npmInstall();
  // });

  // webpack 打包工作流
  gulp.task('webpack', (done) => {
    webpack(webpackConfig, (error, stats) => {
      console.log(
        stats.toString({
          colors: true,
          chunks: false,
          children: false,
          modules: false,
          chunkModules: false,
        })
      );
      if (stats.hasErrors()) {
        throw new Error('webpack compiled failed.');
      }
      done();
    });
  });

  gulp.start('build', (err) => {
    if (err) {
      console.log('BUILD ERROR ❌');
      console.log(err.stack);
    } else {
      console.log('build finished ✅');
    }
  });
})()
