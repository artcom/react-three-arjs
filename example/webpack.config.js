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
      "react-dom": path.resolve("./node_modules/react-dom"),
      "react-redux": path.resolve("./node_modules/react-redux"),
      three: path.resolve("./node_modules/three"),
      "styled-components": path.resolve("./node_modules/styled-components"),
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
        { from: "./node_modules/@ar-js-org/artoolkit5-js/data/", to: "data/" },
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
