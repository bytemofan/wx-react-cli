var path = require('path');
var rootPath = path.join(__dirname,'..');

var webpack = require("webpack"); //引入webpack来进行
var webpackMerge = require('webpack-merge');
var commonConfig = require('./base.js');

module.exports = function (env) {
  return webpackMerge(commonConfig(),{
    devtool:'source-map',
    plugins: [
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('prod')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            mangle: {
                screw_ie8: true,
                keep_fnames: true
            },
            compress: {
                screw_ie8: true
            },
            comments: false,
            sourceMap: true
        })
    ]
  })
}