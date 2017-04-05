var path = require('path');
var rootPath = path.join(__dirname,'..');
var webpack = require("webpack"); //引入webpack来进行
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpackMerge = require('webpack-merge');
var commonConfig = require('./base.js');

module.exports = function (env) {
  return webpackMerge(commonConfig(),{
    devtool: 'cheap-module-source-map',
    entry:[
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://localhost:9000',
        'webpack/hot/only-dev-server',
        path.join(rootPath,'src/main.jsx')
    ],
    devServer:{
        host:'localhost',
        port:9000,
        historyApiFallback:true,
        hot: true,
        stats: {
          colors: true
        },
        inline:true,
        contentBase: path.join(rootPath,'dist'),
        publicPath: '/',
        clientLogLevel: 'none', //日志
        proxy:{
          '/api/*':{
            target: 'http://localhost',
            changeOrigin: true,
            secure: false,
          }
        },
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin(), // HMR全局启用
        new webpack.NamedModulesPlugin(), // 在HMR更新的浏览器控制台中打印更易读的模块名称
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('dev')
            }
        })
    ]
  });
}