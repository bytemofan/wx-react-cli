var path = require('path');   //这个是引入Node的path路径模块用来解析路径的
var webpack = require("webpack"); //引入webpack来进行
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var SpritesmithPlugin = require('webpack-spritesmith');

var rootPath = path.join(__dirname,'..');
var srcPath = path.join(rootPath,'src');
var distPath = path.join(rootPath,'dist');

var  extractCss = new ExtractTextPlugin({
    filename: "css/[name].css",
    allChunks:true,
    disable: false
});
/*var  extractSass = new ExtractTextPlugin({ // 提取sass为单独的文件时用
    filename: "css/[name].css",
    allChunks:true,
    disable: process.env.NODE_ENV === "dev"
});*/

module.exports = function() {
    return {
        entry: {
            'app': './src/main.jsx',
            'vendors':['react','react-dom'],
        },
        output: {
            path: distPath,
            filename: 'js/[name].js',
            publicPath: '/',
            sourceMapFilename: 'sourcemap/[name].map'
        },
        resolve: {
            modules: [srcPath,"node_modules","sprites"],
            extensions: ['.js', '.jsx']
        },
        module:{
            rules:[
                {
                    enforce: "pre",
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: "eslint-loader", // eslint校验
                },
                {
                    test:/\.(js|jsx)$/,
                    loader:'babel-loader', // es6转译
                    include:[srcPath],
                    exclude:/node_modules/
                },
                {
                    test:/\.css$/,
                    use:extractCss.extract({ // 提取css文件
                        fallback:'style-loader',
                        use:[{
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
                        }],
                        publicPath:'/dist'
                    })
                },
                {
                    test:/\.scss$/,
                    use:extractCss.extract({ // 提取scss文件
                        fallback:'style-loader',
                        use:[{
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
                        }],
                        publicPath:'/dist'
                    })
                },
                {
                    test: /\.png$/, // css-sprites资源加载
                    loader: 'file-loader',
                    include: path.join(rootPath,'assets/icons'),
                    options:{
                        name: 'img/sprites/[name].[ext]'
                    }
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
        plugins: [
            extractCss,
            new SpritesmithPlugin({ // css-sprites实现插件
                alias: {
                  'sprite.png': path.join(rootPath, 'dist/img/sprites/sprite.png'),
                  '_sprite.scss': path.join(rootPath, 'dist/img/sprites/_sprite.scss')
                },
                src: {
                    cwd: path.join(rootPath, 'assets/icons'),
                    glob: '*.png'
                },
                target: {
                    image: path.join(rootPath, 'dist/img/sprites/sprite.png'),
                    css: [
                        [path.join(rootPath, 'dist/img/sprites/_sprite.scss'),{
                          format: 'handlebars_based_template',
                        }]
                    ]
                },
                apiOptions: {
                    cssImageRef: "~sprite.png"
                },
                customTemplates: {
                  'handlebars_based_template': path.join(rootPath, 'node_modules/spritesheet-templates/lib/templates/scss_maps.template.handlebars'),
                }
            }),
            new HtmlWebpackPlugin({
                template: 'index.html',
                inject: true
            }),
        ],
    };
}