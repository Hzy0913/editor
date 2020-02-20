const path = require('path');

module.exports = {
  dev: {
    host: 'localhost',
    port: 8080,
    entry: 'example/index.js',
    proxyTable: {},
    useEslint: false,
    showEslintErrorsInOverlay: true,
    preProcessorsCss: 'less',
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    assetsPublicPath: '/',
    devtool: 'cheap-module-eval-source-map',
    poll: false,
    assetsSubDirectory: 'static',
    cacheBusting: true,
    cssSourceMap: true,
    define: undefined
  },
  build: {
    preProcessorsCss: 'less',
    bundleAnalyzerReport: false,
    index: path.resolve('./dist/index.html'),
    assetsRoot: path.resolve('./dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: false,
    devtool: 'eval',
    define: undefined
  }
};
