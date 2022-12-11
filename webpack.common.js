const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const Dotenv = require('dotenv-webpack')
const webpack = require('webpack')
const path = require('path')
const isProduction =
  process.argv[process.argv.indexOf('--mode') + 1] === 'production'

module.exports = {
  entry: {
    index: './src/index.js',
    'lesson-1': './src/lesson-1.jsx'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'docs')
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['@babel/plugin-proposal-class-properties']
          }
        },
        exclude: /node_modules/
      },
      {
        test: /\.(sa|sc|c)ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      },
      {
        test: /\.html$/i,
        loader: 'html-loader'
      },
      // {
      //   resourceQuery: /raw/,
      //   type: 'asset/source'
      // },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[hash][ext][query]'
        }
      },
      {
        test: /\.(ttf|otf|woff|woff2)$/i,
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[ext]'
        }
      },
      {
        test: /\.mp3$/i,
        loader: 'file-loader',
        options: {
          name: 'samples/[name].[ext]'
        }
      }
    ]
  },
  plugins: [
    new Dotenv({
      path: `./.env.${isProduction ? 'production' : 'development'}`
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
    new HtmlWebpackPlugin({
      hash: true,
      scriptLoading: 'blocking',
      template: './src/index.html',
      filename: './index.html',
      chunks: ['index']
    }),
    new HtmlWebpackPlugin({
      hash: true,
      scriptLoading: 'blocking',
      template: './src/lessons/lesson-1.html',
      filename: './lessons/lesson-1.html',
      chunks: ['index', 'lesson-1']
    }),
    new HtmlWebpackPlugin({
      hash: true,
      scriptLoading: 'blocking',
      template: './src/lessons/lesson-2.html',
      filename: './lessons/lesson-2.html',
      chunks: ['index']
    }),
    new HtmlWebpackPlugin({
      hash: true,
      scriptLoading: 'blocking',
      template: './src/lessons/lesson-3.html',
      filename: './lessons/lesson-3.html',
      chunks: ['index']
    }),
    new HtmlWebpackPlugin({
      hash: true,
      scriptLoading: 'blocking',
      template: './src/lessons/lesson-4.html',
      filename: './lessons/lesson-4.html',
      chunks: ['index']
    }),
    new HtmlWebpackPlugin({
      hash: true,
      scriptLoading: 'blocking',
      template: './src/lessons/lesson-5.html',
      filename: './lessons/lesson-5.html',
      chunks: ['index']
    })
  ],
  optimization: {
    minimizer: [new CssMinimizerPlugin()]
  }
}
