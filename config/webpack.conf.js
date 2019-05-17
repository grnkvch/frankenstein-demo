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
        test: /\.(jpg|png|svg|webp)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "images/[name].[ext]",
              publicPath: (url, resourcePath, context) => {
                if (/react/.test(resourcePath)) {
                  return `react/public/${url}`;
                }
              },

            }
          }
        ]
      },
      {
        test: /\.css$/,
        oneOf: [
          // this matches stylesheets coming from /react/ subfolder
          {
            test: /\/react\//,
            use: [
              {
                loader: 'style-loader',
                options: {
                  injectType: 'singletonStyleTag',
                  insert: 'frankenstein-header-wrapper'
                }
              },
              {
                loader: 'css-loader',
                options: {
                  localIdentName: '[local]_[hash:base64:5]'
                }
              }
            ]
          },
          {
            use: [
              {
                loader: 'css-loader',
                options: {
                  localIdentName: '[local]_[hash:base64:5]'
                }
              }
            ]
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
