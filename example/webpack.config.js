/* eslint-disable no-undef */

const HtmlWebpackPlugin = require("html-webpack-plugin")
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const path = require("path")

module.exports = (_, { mode }) => ({
  entry: {
    main: "./src/index.js",
  },
  devServer: {
    host: "0.0.0.0",
    hot: true,
  },
  resolve: {
    alias: {
      react: path.resolve("./node_modules/react"),
      three: path.resolve("./node_modules/three"),
      "react-dom": path.resolve("./node_modules/react-dom"),
      "@react-three/fiber": path.resolve("./node_modules/@react-three/fiber"),
    },
  },
  plugins: [
    mode === "development" && new ReactRefreshWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "src/index.html",
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: "./data/", to: "data/" },
      ],
    }),
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
              plugins: [mode === "development" && "react-refresh/babel"].filter(Boolean),
            },
          },
        ],
      },
    ],
  },
})
