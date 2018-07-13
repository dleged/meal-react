// const webpackMerge = require('webpack-merge');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpack = require('webpack');
const rules = require('./rules');
const baseConfig = require('./webpack.basic.config');

const env = process.env;
const plugins = [new webpack.HotModuleReplacementPlugin()];
const chalk = require('chalk');

module.exports = Object.assign(baseConfig, {
    devtool: 'cheap-module-source-map',
    mode: 'development',
    output: {
      publicPath: ''
    },
    module: {
      rules: rules()
    }
  })
