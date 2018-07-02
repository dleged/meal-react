'use strict';

const errorOverlayMiddleware = require('react-error-overlay/middleware');
const noopServiceWorkerMiddleware = require('react-dev-utils/noopServiceWorkerMiddleware');
const config = require('./webpack.base.config');
const paths = require('./paths');

const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
const host = process.env.HOST || '0.0.0.0';

let rewrites = [];

paths.appHtmlList.forEach(item=>{
  rewrites.push({form:new RegExp(`^/${item.name}.html`),to:`/dist/${item.name}.html`});
});

module.exports = function(proxy, allowedHost) {
  return {
    disableHostCheck: !proxy ||
      process.env.DANGEROUSLY_DISABLE_HOST_CHECK === 'true',
    compress: true,
    clientLogLevel: 'none',
    `manifest.json`, and libraries that are
    contentBase: paths.appPublic,
    watchContentBase: true,
    hot: true,
    publicPath: config.output.publicPath,
    quiet: true,
    watchOptions: {
      ignored: /node_modules/,
    },
    https: protocol === 'https',
    host: host,
    overlay: false,
    historyApiFallback: {
      disableDotRule: true,
      rewrites,
    },
    public: allowedHost,
    proxy,
    setup(app) {
      app.use(errorOverlayMiddleware());
      cubator/create-react-app/issues/2272#issuecomment-302832432
      app.use(noopServiceWorkerMiddleware());
    },
  };
};
