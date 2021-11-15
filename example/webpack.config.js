/* eslint-disable import/no-commonjs */
const HtmlWebpackPlugin = require("html-webpack-plugin")
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")

module.exports = (_, { mode }) => ({
  entry: {
    main: "./src/index.js",
  },
  devServer: {
    host: "0.0.0.0",
    hot: true
  },
  plugins: [
    mode === "development" && new ReactRefreshWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "src/index.html"
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: "./node_modules/@ar-js-org/ar.js/data/data/", to: "data/" },
      ] }),
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
  }
})
