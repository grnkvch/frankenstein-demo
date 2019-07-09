const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  entry: {
    app: "./js/index.js",
    frankenstein: [
      "@babel/runtime/regenerator",
      "@babel/register",
      "./js/frankenstein-wrappers/index.js"
    ]
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: {
          loader: 'vue-loader',
          options: {
            shadowMode: true
          }
        }
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        oneOf: [
          {
            resourceQuery: /module/,
            use: [
              {
                loader: 'vue-style-loader',
                options: {
                  shadowMode: true
                }
              },
              {
                loader: 'css-loader',
                options: {
                  importLoaders: 2,
                  modules: true,
                }
              }
            ],
          },
          {
            resourceQuery: /shadow/,
            use: [
              'css-loader'
            ]
          },
          {
            include: [
              path.resolve(__dirname, 'vue')
            ],
            use: [
              {
                loader: 'vue-style-loader',
                options: {
                  shadowMode: true
                }
              },
              {
                loader: 'css-loader',
                options: {
                  modules: false,
                  import: true
                }
              }
            ],
          },
          {
            use: [
              'css-loader'
            ]
          }
        ],
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
    // make sure to include the plugin!
    new VueLoaderPlugin()
  ]
}