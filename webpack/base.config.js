const webpack = require("webpack"),
  path = require("path"),
  CleanWebpackPlugin = require("clean-webpack-plugin"),
  CopyWebpackPlugin = require("copy-webpack-plugin"),
  HtmlWebpackPlugin = require("html-webpack-plugin"),
  WriteFilePlugin = require("write-file-webpack-plugin"),
  SourceMapDevToolPlugin = webpack.SourceMapDevToolPlugin;

const alias = {};

const fileExtensions = [
  "jpg",
  "jpeg",
  "png",
  "gif",
  "eot",
  "otf",
  "svg",
  "ttf",
  "woff",
  "woff2",
];

const basePath = path.resolve(__dirname, "..");

const options = {
  context: basePath,
  mode: process.env.NODE_ENV || "development",
  entry: {
    popup: path.join(basePath, "src", "ts", "popup", "index.ts"),
    background: path.join(basePath, "src", "ts", "background", "index.ts"),
    explorer: path.join(basePath, "src", "ts", "explorer", "index.tsx"),
    contentScript: path.join(basePath, "src", "ts", "content", "index.ts"),
    swagger: path.join(basePath, "src", "ts", "swagger", "index.ts"),
  },
  devtool: false,
  output: {
    path: path.resolve(basePath, "build"),
    filename: "[name].bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: "style-loader!css-loader",
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader", // creates style nodes from JS strings
          "css-loader", // translates CSS into CommonJS
          "sass-loader", // compiles Sass to CSS, using Node Sass by default
        ],
      },
      {
        test: new RegExp(".(" + fileExtensions.join("|") + ")$"),
        loader: "file-loader?name=[name].[ext]",
        exclude: /node_modules/,
      },
      {
        test: /\.html$/,
        loader: "html-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(js)$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    alias: alias,
    extensions: fileExtensions
      .map(extension => "." + extension)
      .concat([".jsx", ".js", ".css", ".ts", ".tsx"]),
  },
  plugins: [
    // clean the build folder
    new CleanWebpackPlugin(["build"]),
    // expose and write the allowed env vars on the compiled bundle
    new webpack.EnvironmentPlugin(["NODE_ENV", "DEBUG"]),
    new CopyWebpackPlugin([
      {
        from: path.join(basePath, "src", "manifest.json"),
        transform: function(content, path) {
          // generates the manifest file using the package.json informations
          return Buffer.from(
            JSON.stringify({
              description: process.env.npm_package_description,
              version: process.env.npm_package_version,
              ...JSON.parse(content.toString()),
            })
          );
        },
      },
    ]),
    new CopyWebpackPlugin([
      {
        from: path.join(basePath, "src", "img"),
      },
    ]),
    new CopyWebpackPlugin([
      {
        from: path.join(basePath, "swagger-editor", "dist"),
        to: "dist",
      },
    ]),
    new HtmlWebpackPlugin({
      template: path.join(basePath, "src", "popup.html"),
      filename: "popup.html",
      chunks: ["popup"],
    }),
    new HtmlWebpackPlugin({
      template: path.join(basePath, "src", "background.html"),
      filename: "background.html",
      chunks: ["background"],
    }),
    new HtmlWebpackPlugin({
      template: path.join(basePath, "src", "explorer.html"),
      filename: "explorer.html",
      chunks: ["explorer"],
    }),
    new HtmlWebpackPlugin({
      template: path.join(basePath, "src", "swagger.html"),
      filename: "swagger.html",
      chunks: ["swagger"],
    }),
    new WriteFilePlugin(),
    new SourceMapDevToolPlugin({}),
  ],
};

module.exports = options;
