const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const port = process.env.PORT || 3000;

module.exports = {
  node: {
    fs: "empty"
  },
  mode: 'development',
  entry: './src/js/main.js',
  output: {
    filename: './src/bundle.js'
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.(css)$/i,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: false, // !! true for using css module, false for using just css
              localsConvention: 'camelCase',
              sourceMap: true,
            }
          },
        ]
      },
      {
        test:/\.(txt)$/i,
        use:[
          {
            loader: 'file-loader',
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
            'style-loader',
            'css-loader',
            'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html",
      favicon: 'favicon.ico'
    })
  ],
  devServer: {
    host: 'localhost',
    port: port,
    historyApiFallback: true,
    open: true
  }
}
