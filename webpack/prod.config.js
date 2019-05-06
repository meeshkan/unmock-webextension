const merge = require("webpack-merge");
const baseConfig = require("./base.config.js");
const webpack = require("webpack");
const SourceMapDevToolPlugin = webpack.SourceMapDevToolPlugin;

module.exports = merge(baseConfig, {
  devtool: false,
  optimization: {
    // Disable minification for now as Chrome does not accept minimized content script as UTF-8
    minimize: false,
  },
  plugins: [new SourceMapDevToolPlugin()],
});
