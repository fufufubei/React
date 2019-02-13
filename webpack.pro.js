const path = require("path");
const merge = require("webpack-merge");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const publicPath = ""  //打包后静态资源前缀
let baseConfig = require("./webpack.config");
function resolve(dir) {
  return path.join(__dirname, '..', dir)
}
module.exports = merge(baseConfig, {
  output: {
    path: path.resolve(__dirname, "./build"),
    filename: "js/[name].[hash:8].js",
    publicPath: "/" + publicPath
  },
  module: {
    rules: [
      {
        // 文件匹配正则
        test: /\.css$/,
        // 加载器，从后向前倒序使用
        use: [MiniCssExtractPlugin.loader, 'css-loader?minimize=true', 'postcss-loader',],
      },
      {
        test: /\.vue$/,
        use: [{
          loader: 'vue-loader',
          options: {
            loaders: {
              css: {
                use: [MiniCssExtractPlugin.loader, "vue-style-loader", 'css-loader?minimize=true', 'postcss-loader',],
              },
              less: {
                use: [MiniCssExtractPlugin.loader, "vue-style-loader", 'css-loader?minimize=true', "less-loader", 'postcss-loader',],
              },
              sass: {
                use: [MiniCssExtractPlugin.loader, "vue-style-loader", 'css-loader?minimize=true', "sass-loader", 'postcss-loader',],
              },
              stylus: {
                use: [MiniCssExtractPlugin.loader, "vue-style-loader", 'css-loader?minimize=true', 'postcss-loader', {
                  loader: 'stylus-loader',
                  options: { 'resolve url': true }
                },],
              },
              styl: {
                use: [MiniCssExtractPlugin.loader, "vue-style-loader", 'css-loader?minimize=true', 'postcss-loader', {
                  loader: 'stylus-loader',
                  options: { 'resolve url': true }
                },],
              }
            }
          }
        }]
      },
      {
        test: /\.less$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader?minimize=true', 'postcss-loader', "less-loader"],
      },
      {
        test: /\.styl$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader?minimize=true', 'postcss-loader', {
          loader: 'stylus-loader',
          options: { 'resolve url': true }
        },]
      },
      {
        test: /\.stylus$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader?minimize=true', 'postcss-loader', {
          loader: 'stylus-loader',
          options: { 'resolve url': true }
        },],
      },
    ]
  },
  /**
   * 
   * 压缩配置  js以及css压缩
   */
  optimization: {
    minimize:true,
    minimizer: [
      new UglifyJsPlugin({
      })
    ],
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    },

  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/[name].[hash:8].css"
    }),
    new CleanWebpackPlugin(["build"], {
      root: path.join(__dirname, "./"), //根目录
      verbose: true,
      dry: false,
    }),
    //判断当前为生产和开发模式的变量
    new webpack.DefinePlugin({
      currentENVIR: "'build'"
    }),
  ],
})