const path = require('path');
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');//html模块模块
const merge = require('webpack-merge'); //合并config文件模块
const PostCompilePlugin = require('webpack-post-compile-plugin') //后编译
const fs = require('fs');
const glob = require("glob");
const { VueLoaderPlugin } = require('vue-loader');
let ENV = process.env.NODE_ENV;
function resolve(dir) {
  return path.resolve(__dirname, dir)
}
// console.log(__dirname+"/src")
let entry = {};
let plugins = [];
let dir = [];
let moduleFiles = fs.readdirSync(resolve('./src/views'));
moduleFiles.forEach(function (filename) {
  var fullname = path.join(resolve('./src/views'), filename);
  var stats = fs.statSync(fullname);
  if (stats.isDirectory()) {
    dir.push(filename);
  }
});
let path1 = '';
if (dir.length) {
  dir.forEach((target) => {
    path1 = path.join(__dirname, "src/views/" + target + "/*.js");
    glob.sync(path1).forEach(entry1 => {
      var basename = path.basename(entry1, path.extname(entry1));
      entry[basename] = entry1;
    })
    let plug = {};
    plug.filename = "./"+target+".html";
    plug.template = path.join(__dirname, "src/" + "/views/" + target + "/" + target + ".html");
    plug.chunks = [target];
    plugins.push(new HtmlWebpackPlugin(plug));
  });
} else {
  entry = { main: path.resolve(__dirname, "./src/views/main.js") };
  plugins = [new HtmlWebpackPlugin({
    template: './src/views/index.html',
    filename: 'index.html',
    hash: true
  })]
}
module.exports = {
  entry,
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 1000, // 只转码 1M以下的图片
          name: 'img/[name].[hash:7].[ext]' // 发布到 dist/img 目录下，名称中添加 hash 值，避免缓存
        }
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        include: [resolve('./src'), resolve('./common'), resolve('./node_modules/cube-ui/src')]
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'media/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'fonts/[name].[hash:7].[ext]'
        }
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.json', '.vue', '.css'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      public: path.resolve(__dirname, "./common/public/Src"),
      plug: path.resolve(__dirname, "./common/plug/Src"),
      components: path.resolve(__dirname, "./common/components"),
      controls: path.resolve(__dirname, "./common/controls/modules"),
      '@': path.resolve(__dirname, "./src")
    }
  },

  // 插件
  plugins: [
    ...plugins,
    new VueLoaderPlugin(),
    new PostCompilePlugin()
  ],
  externals: {
    Vue: "Vue",
    vueRouter: "vue-router",
  }
}