const merge = require("webpack-merge");
const baseConfig = require("./base.config.js");
const _cloneDeep = require("lodash/cloneDeep");
const webpack = require("webpack");
const SourceMapDevToolPlugin = webpack.SourceMapDevToolPlugin;

const config = _cloneDeep(baseConfig);

config.plugins = [new SourceMapDevToolPlugin()].concat(config.plugins || []);

module.exports = merge(config, {
  devtool: false,
  optimization: {
    // Disable minification for now as Chrome does not accept minimized content script as UTF-8
    minimize: false,
  },
});
