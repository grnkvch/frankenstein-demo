const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  entry: {
    'app': './js/app.js',
    'frankenstein': [
      '@babel/runtime/regenerator',
      '@babel/register',
      '@webcomponents/webcomponentsjs/webcomponents-loader.js',
      './frankenstein-wrappers/index.js'
    ],
  },
  mode: 'development',
  devServer: {
    contentBase: './',
    overlay: true,
    stats: {
      colors: true
    }
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules\/(?!(@polymer|lit-element|lit-html)\/).*/,
        include: [
          // These packages are distributed as es2015 modules, therefore they need
          // to be transpiled to es5.
          /node_modules(?:\/|\\)lit-element|lit-html/
        ],
        loader: 'babel-loader'
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
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              publicPath: (url, resourcePath, context) => {
                if (/vue/.test(resourcePath)) {
                  return `../vue/public/${url}`;
                }
              },
            }
          }
        ]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader'
          }
        ]
      },
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new VueLoaderPlugin()
  ]
};
