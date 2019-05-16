const webpack = require("webpack");

module.exports = {
  entry: {
    app: "./js/app.js",
    frankenstein: [
      "@babel/runtime/regenerator",
      "@babel/register",
      "./js/frankenstein-wrappers/index.js"
    ]
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
      {
        test: /\.css$/,
        use: {
          loader: 'css-loader',
          options: {
            modules: true
          }
        }
      },
      {
        test: /\.(jpg|png|svg|webp)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "images/[name].[ext]"
            }
          }
        ]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
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
