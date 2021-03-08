/* eslint-disable import/no-commonjs */
const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const webpack = require("webpack")

module.exports = (_, { mode }) => ({
  devServer: {
    publicPath: "/",
    contentBase: "./dist",
    host: "0.0.0.0",
    https: true
  },
  plugins: [
    mode === "development" && new webpack.HotModuleReplacementPlugin(),
    mode === "development" && new ReactRefreshWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "src/index.html",
      inject: false
    }),
    new CopyWebpackPlugin([
      { from: "lib/", to: "lib/" },
      { from: "data/", to: "data/" }
    ])
  ].filter(Boolean),
  devtool: mode === "development" ? "eval-source-map" : "source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              plugins: [
                mode === "development" && "react-refresh/babel",
              ].filter(Boolean),
            },
          },
        ]
      }
    ]
  },
  entry: {
    app: {
      import: "./src/index.js",
      dependOn: "shared",
    },
    threeJS: {
      import: "./src/threeJSEntry.js",
      dependOn: "shared",
    },
    shared: "three"
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  optimization: {
    runtimeChunk: "single"
  },
})
