var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var args = require('yargs').argv;

var path = require('path');
var ROOT_PATH = path.resolve(__dirname);
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');

var APP_PATH = path.resolve(ROOT_PATH, 'app');
var APP_CSS_PATH = path.resolve(APP_PATH, 'css');
var TEM_PATH = path.resolve(APP_PATH, 'templates');
var APP_JSX_PATH = path.resolve(APP_PATH, 'js');
var node_modules_dir = path.resolve(__dirname, 'node_modules');

module.exports = {
    // 三个入口文件
    entry: {
        app: path.resolve(APP_PATH, 'index.js'),
        mobile: path.resolve(APP_PATH, 'mobile.js'), // 测试另一个入口文件
        vendor: [
            'jquery',
            'angular', 'angular-ui-router'
        ]
    },
    // 有多少个入口文件,就会生成多少个 js 文件
    output: {
        path: BUILD_PATH,
        filename: 'script/[name].[hash].js'
    },
    module: {
        loaders: [{
            test: /\.css$/,
            // loaders:['style','css'], include: APP_CSS_PATH,
            loader: ExtractTextPlugin.extract('style!css', 'css?sourceMap')
        }, {
            test: /\.scss$/,
            loaders: ['style', 'css', 'sass'],
            include: APP_CSS_PATH
        }, {
            test: /\.(png|jpg)$/,
            loader: 'url?limit=4000&name=assets/images/[hash].[ext]'
        }, {
            test: /\.(woff|woff2|ttf|eot|svg)(\?]?.*)?$/,
            loader: 'file?name=assets/fonts/[name].[ext]?[hash]'
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Hello World app',
            template: path.resolve(TEM_PATH, 'index.html'),
            filename: 'index.html',
            chunks: ['app'],
            inject: 'html'
        }),
        new HtmlWebpackPlugin({
            title: 'Hello World Mobile',
            template: path.resolve(TEM_PATH, 'mobile.html'),
            filename: 'mobile.html',
            chunks: ['mobile'],
            inject: 'html'
        }),
        // 使用 uglifyJs 压缩压缩
        new webpack.optimize.UglifyJsPlugin({ minimize: true }),
        // 把入口文件打包成 vendors
        new webpack.optimize.CommonsChunkPlugin("vendor", "vendor/bundle.js"),
        new ExtractTextPlugin('[name].css'),
        // 将公共栏目复制到指定目录下
        new CopyWebpackPlugin([
            { from: 'node_modules/bootstrap/dist/css/bootstrap.min.css', to: 'vendor/bootstrap.min.css' },
            { from: 'app/templates/tpls', to: 'templates/tpls' }
        ]),
        new webpack.DefinePlugin({
            __DEV__: JSON.stringify(JSON.parse(args.mock || false))
        })
    ]
}
