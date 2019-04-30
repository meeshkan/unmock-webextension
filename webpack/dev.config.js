const merge = require("webpack-merge");
const path = require("path");
const baseConfig = require("./base.config.js");
const webpack = require("webpack");
const _cloneDeep = require("lodash/cloneDeep");

const config = _cloneDeep(baseConfig);

// Content scripts cannot be hot-reloaded as they cannot access localhost
// https://github.com/samuelsimoes/chrome-extension-webpack-boilerplate#content-scripts
const excludeEntriesToHotReload = ["contentScript"];
const devServerPort = 3001;

for (let entryName in config.entry) {
  if (!excludeEntriesToHotReload.includes(entryName)) {
    config.entry[entryName] = [
      "webpack-dev-server/client?http://localhost:" + devServerPort,
      "webpack/hot/dev-server",
    ].concat(config.entry[entryName]);
  }
}

config.plugins = [new webpack.HotModuleReplacementPlugin()].concat(
  config.plugins || []
);

const devServer = {
  hot: true,
  contentBase: path.join(__dirname, "../build"),
  headers: { "Access-Control-Allow-Origin": "*" },
  disableHostCheck: true,
};

const devOptions = {
  devServer,
};

module.exports = merge(config, devOptions);
