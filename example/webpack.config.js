/* eslint-disable import/no-commonjs */
const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = (env = {}) => ({
  devServer: {
    publicPath: "/",
    contentBase: "./dist",
    host: "0.0.0.0",
    https: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html"
    }),
    new CopyWebpackPlugin([
      { from: "data/", to: "data/" }
    ])
  ],
  mode: env.production ? "production" : "development",
  devtool: env.production ? "source-map" : "eval-source-map",
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  },
  resolve: {
    alias: {
      "react": path.resolve("./node_modules/react"),
      "react-dom": path.resolve("./node_modules/react-dom"),
      "react-three-fiber": path.resolve("./node_modules/react-three-fiber")
    }
  },
  entry: {
    app: "./src/index.js"
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  }
})
