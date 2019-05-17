const webpack = require("webpack");

module.exports = {
  entry: {
    app: "./js/app.js",
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
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("development")
      }
    }),
  ]
};