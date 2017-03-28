var path = require('path');   //这个是引入Node的path路径模块用来解析路径的
var webpack = require("webpack"); //引入webpack来进行
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var rootPath = path.join(__dirname,'..');
var srcPath = path.join(rootPath,'src');
var distPath = path.join(rootPath,'dist');

module.exports = function() {
    return {
        entry: {
            'app': './src/main.js',
            'vendors':['react','react-dom'],
        },
        output: {
            path: distPath,
            filename: 'js/[name].js',
            publicPath: '/',
            sourceMapFilename: 'sourcemap/[name].map'
        },
        resolve: {
            modules: [srcPath,"node_modules"],
            extensions: ['.js', '.jsx']
        },
        module:{
            rules:[
                {
                    test:/\.(js|jsx)$/,
                    use:[
                        'babel-loader'
                    ],
                    include:[srcPath],
                    exclude:/node_modules/
                },
                {
                    test:/\.css$/,
                    use:ExtractTextPlugin.extract({ //提取css文件
                        fallback:'style-loader',
                        use:'css-loader',
                        publicPath:'/dist'
                    })
                }
            ],
        },
        plugins: [
            new ExtractTextPlugin({
                filename:'css/[name].css',
                disable:false,
                allChunks:true
            }),
            new HtmlWebpackPlugin({
                template: 'index.html',
                inject: true
            }),
        ],
    };
}