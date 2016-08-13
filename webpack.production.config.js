var HtmlwebpackPlugin = require ('html-webpack-plugin');
var webpack = require('webpack');

var path = require('path');
var ROOT_PATH       = path.resolve(__dirname);
var BUILD_PATH      = path.resolve(ROOT_PATH, 'build');

var APP_PATH        = path.resolve(ROOT_PATH, 'app');
var APP_CSS_PATH    = path.resolve(APP_PATH,'css');
var TEM_PATH        = path.resolve(APP_PATH, 'templates');
var APP_JSX_PATH    = path.resolve(APP_PATH, 'js');

module.exports = {
    // 三个入口文件
    entry: {
        app:    path.resolve(APP_PATH, 'index.js'),
        mobile: path.resolve(APP_PATH, 'mobile.js'),
        vendor: [
            'angular',
            'angular-ui-router',
            'angular-animate',
            'angular-mocks'
        ]
    },
    // 有多少个入口文件,就会生成多少个 js 文件
    output: {
        path: BUILD_PATH,
        filename: '[name].[hash].js'
    },
    module: {
        loaders: [
            {
                test: /\.css$/, loaders:['style','css'], include: APP_CSS_PATH
            },{
                test: /\.scss$/, loaders:['style','css','sass'], include: APP_CSS_PATH
            },{
                test: /\.(png|jpg)$/, loader:'url?limit=4000'
            }
        ]
    },
    // 添加插件,会自动生成一个 html 文件
    // 如果你有自己的 html 文件,则不需要生成,但要在 html 中手动添加生成后的 js 的路径
    plugins: [
        new HtmlwebpackPlugin({
            title: 'Hello World app',
            template: path.resolve(TEM_PATH, 'index.html'),
            filename: 'index.html',
            chunks: ['app','vendor'],
            inject: 'head'
        }),
        new HtmlwebpackPlugin({
            title: 'Hello Mobile app',
            template: path.resolve(TEM_PATH, 'mobile.html'),
            filename: 'mobile.html',
            chunks: ['mobile','vendor'],
            inject: 'head'
        }),
        new webpack.ProvidePlugin({ // 全局变量
            $: "jquery", 
            jQuery: "jquery",
            "window.jQuery" : "jquery"
        }),
        // 使用 uglifyJs 压缩压缩
        new webpack.optimize.UglifyJsPlugin({minimize: true}),
        // 把入口文件打包成 vendors
        // new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js')
    ]
}