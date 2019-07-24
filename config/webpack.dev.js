const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: {
    app: "./js/app.js"
  },
  mode: "development",
  devServer: {
    contentBase: "./",
    overlay: true,
    stats: {
      colors: true
    }
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules\/(?!(@polymer|lit-element|lit-html)\/).*/,
        include: [
          // These packages are distributed as es2015 modules, therefore they need
          // to be transpiled to es5.
          /node_modules(?:\/|\\)lit-element|lit-html/
        ],
        loader: "babel-loader"
      },
      {
        test: /\.css$/,
        loader: "css-loader"
      },
      {
        test: /\.(jpg|png|svg|webp)$/,
        loader: "file-loader"
      },
      {
        test: /\.html$/,
        loader: "html-loader"
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("development")
      }
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
};
