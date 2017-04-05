var path = require('path');
var rootPath = path.join(__dirname,'..');
var srcPath = path.join(rootPath,'src');
var distPath = path.join(rootPath,'dist');
var testPath = path.join(rootPath,'test');

module.exports = {
    devtool: 'inline-source-map',
    resolve: {
        modules: [srcPath,"node_modules",testPath],
        extensions: ['.js', '.jsx']
    },
    module:{
        rules:[{
                test:/\.(js|jsx)$/,
                loader:'babel-loader', // es6转译
                include:[srcPath,testPath],
                exclude:/node_modules/
            },
            {
                test:/\.css$/,
                use:[{
                    loader:'style-loader'
                },{
                    loader:'css-loader',
                    options:{
                        modules:true, // 开启css-modules
                        minimize:false,
                        sourceMap:true, // Sourcemaps
                        camelCase:false // 用CamelCase方式导出类名
                    }
                },{
                    loader:'px2rem-loader',
                    options:{
                        remUnit: 32,
                        remPrecision: 8
                    }
                },{
                    loader:'postcss-loader',
                    options:{
                        plugins: function () {
                            return [
                               require('autoprefixer') // 自动前缀
                            ]
                        }
                    }
                }]
            },
            {
                test:/\.scss$/,
                use:[{
                    loader:'style-loader'
                },{
                    loader:'css-loader',
                    options:{
                        modules:false, // 开启css-modules
                        minimize:false,
                        sourceMap:true, // Sourcemaps
                        camelCase:false // 用CamelCase方式导出类名
                    }
                },{
                    loader:'px2rem-loader',
                    options:{
                        remUnit: 32,
                        remPrecision: 8
                    }
                },{
                    loader:'postcss-loader',
                    options:{
                        plugins: function () {
                            return [
                               require('autoprefixer') // 自动前缀
                            ]
                        }
                    }
                },{
                    loader:'sass-loader',
                    options:{
                        sourceMap:true // Sourcemaps
                    }
                }]
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'img/[name].[ext]'
                        }
                    },{
                        loader:'image-webpack-loader',
                        options: {
                            gifsicle: {
                              interlaced: false,
                            },
                            optipng: {
                              optimizationLevel: 7,
                            },
                            pngquant:{
                                quality: "65-90", 
                                speed: 4
                            },
                            mozjpeg: {
                                progressive: true,
                                quality: 65
                            },
                            svgo:{
                              plugins: [
                                {
                                  removeViewBox: false
                                },
                                {
                                  removeEmptyAttrs: false
                                }
                              ]
                            }
                        }
                    }
                ],
                exclude:[/node_modules/,path.join(rootPath,'assets/icons')]
            }
        ],
    },
    externals: {
        'react/addons': true,
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true
    }
}