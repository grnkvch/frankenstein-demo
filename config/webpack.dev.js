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
        options: {
          shadowMode: true
        }
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
        oneOf: [
          // this matches `<style module>`
          {
            resourceQuery: /module/,
            use: [
              {
                loader:'vue-style-loader',
                options: {
                  shadowMode: true
                }
              },
              {
                loader: 'css-loader',
                options: {
                  modules: true,
                  localIdentName: '[local]_[hash:base64:5]'
                }
              }
            ]
          },
          // this matches plain `<style>` or `<style scoped>`
          {
            resourceQuery: /vue/,
            use: [
              {
                loader:'vue-style-loader',
                options: {
                  shadowMode: true
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
          // Now all global styles
          {
            oneOf: [
              {
                issuer: /Header/,
                use: [
                  {
                    loader: 'style-loader',
                    options: {
                      insert: 'frankenstein-header-wrapper'
                    }
                  },
                  {
                    loader: 'css-loader',
                    options: {
                      localIdentName: '[local]_[hash:base64:5]'
                    }
                  },
                ]
              },
              {
                issuer: /Listing/,
                use: [
                  {
                    loader: 'style-loader',
                    options: {
                      insert: 'frankenstein-listing-wrapper'
                    }
                  },
                  {
                    loader: 'css-loader',
                    options: {
                      localIdentName: '[local]_[hash:base64:5]'
                    }
                  },
                ]
              },
            ]
          },
        ]
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
                  return `vue/public/${url}`;
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
