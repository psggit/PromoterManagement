const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CleanWebpackPlugin = require("clean-webpack-plugin")
const webpack = require("webpack")

module.exports = {
  entry: {
    app: path.resolve(__dirname, "./../../src/App.js"),
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "",
      filename: "ssr.html",
      template: path.resolve(__dirname, "./../../html/ssr.html")
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      title: "",
      template: path.resolve(__dirname, "./../../index.html")
    }),
    new webpack.DefinePlugin({
      "process.env.BASE_URL": JSON.stringify(process.env.BASE_URL || "basketball38.hasura-app.io")
    })
  ],
  output: {
    filename: "[name].[chunkhash].js",
    path: path.resolve(__dirname, "./../../dist"),
    publicPath: "/admin"
  },
  resolve: {
    alias: {
      // react: "preact-compat",
      // "react-dom": "preact-compat",
      Components: path.resolve(__dirname, "./../../src/components"),
      Utils: path.resolve(__dirname, "./../../src/utils"),
      Sass: path.resolve(__dirname, "./../../src/sass")
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/
      }
    ]
  }
}
