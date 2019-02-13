const path = require('path');
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');//html模块模块
const merge = require('webpack-merge'); //合并config文件模块
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const baseConfig = require("./webpack.config");
var os = require('os'),
  ip = "127.0.0.1",
  ifaces = os.networkInterfaces();
for (var dev in ifaces) {
  ifaces[dev].forEach(function (details, alias) {
    if (details.family == 'IPv4') {
      if (details.address.indexOf('127.0.0.1') < 0) {
        ip = details.address;
      }
    }
  });
}
console.log(ip);
function resolve(dir) {
  return path.join(__dirname, '..', dir)
}
module.exports = merge(baseConfig, {
  output: {
    path: path.resolve(__dirname, "./build"),
    filename: "js/[name][hash:8].js",
    publicPath: "/"
  },
  module: {
    rules: [
      {
        // 文件匹配正则
        test: /\.css$/,
        // 加载器，从后向前倒序使用
        use: ['vue-style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.vue$/,
        use: [{
          loader: 'vue-loader',
          options: {
            loaders: {
              css: {
                use: ["vue-style-loader", 'style-loader', 'css-loader', 'postcss-loader',],
              },
              less: {
                use: ["vue-style-loader", 'style-loader', 'css-loader', 'less-loader', 'postcss-loader'],
              },
              sass: {
                use: ["vue-style-loader", "sass-loader", 'css-loader', 'postcss-loader',],
              },
              styl: {
                use: ["vue-style-loader", 'css-loader', 'postcss-loader', {
                  loader: 'stylus-loader',
                  options: { 'resolve url': true }
                },],
              },
              stylus: {
                use: ["vue-style-loader", 'css-loader', 'postcss-loader', {
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
        use: ['vue-style-loader', 'css-loader', 'postcss-loader', 'less-loader'],
      },
      {
        test: /\.styl$/,
        use: ["vue-style-loader", 'css-loader', 'postcss-loader', {
          loader: 'stylus-loader',
          options: { 'resolve url': true }
        }],

      },
      {
        test: /\.stylus$/,
        use: ["vue-style-loader", 'css-loader', 'postcss-loader', {
          loader: 'stylus-loader',
          options: { 'resolve url': true }
        },],

      },
    ]
  },
  // 插件
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // 热替换模块
    new webpack.HashedModuleIdsPlugin(), //使用 hash 做为模块ID, 避免缓存那些没有变化的模块内容，从而实现更优的缓存策略,
    //判断当前为生产和开发模式的变量
    new webpack.DefinePlugin({
      currentENVIR: "'dev'"
    }),
  ],
  // Web服务器配置
  devServer: {
    host: ip,
    inline: true, //打包后加入一个websocket客户端
    hot: true, //热加载\
    //请求代理
    proxy: {
    }
  }
})