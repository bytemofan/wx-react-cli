// Karma configuration
// Generated on Wed Apr 05 2017 11:28:01 GMT+0800 (中国标准时间)
var webpack_config = require('./config/test.js');

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha','chai'],


    // list of files / patterns to load in the browser
    files: [
        './test/**/*.js'
    ],


    // list of files to exclude
    // exclude: [
    // ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
        'src/**/*.{jsx,js}': ['webpack', 'sourcemap'],
        'test/**/*.test.js': ['webpack', 'sourcemap']
    },

    // webpack file
    webpack: webpack_config,

    webpackMiddleware:{
      noInfo:false
    },

    plugins: [
      require('karma-webpack'),
      require('karma-mocha'),
      require('karma-chai'),
      require('karma-sourcemap-loader'),
      require('karma-chrome-launcher'),
      require('karma-coverage'),
      require('karma-mocha-reporter'),//测试样式
      // 'karma-sinon',//监视、辅助测试工具
      // 'karma-sinon-chai'
    ],


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['mocha','coverage'],
    coverageReporter: {
      /**
       *@description 覆盖报告插件的配置coverage,可以在目录内查看覆盖说明
       *@url https://www.npmjs.com/package/karma-coverage
       */
      dir: 'dist/coverage/',//目录
      reporters: [
       // reporters not supporting the `file` property 
        { type: 'html', subdir: 'report-html' }
      ]
    },


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
