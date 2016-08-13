var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var path = require('path');
var ROOT_PATH       = path.resolve(__dirname);
var BUILD_PATH      = path.resolve(ROOT_PATH, 'build');

var APP_PATH        = path.resolve(ROOT_PATH, 'app');
var APP_CSS_PATH    = path.resolve(APP_PATH,'css');
var TEM_PATH        = path.resolve(APP_PATH, 'templates');
var APP_JSX_PATH    = path.resolve(APP_PATH, 'js');
var node_modules_dir = path.resolve(__dirname, 'node_modules');

module.exports = {
    // 三个入口文件
    entry: {
        app:    path.resolve(APP_PATH, 'index.js'),
        vendor: [
            'jquery',
            'angularjs', 'angular-ui-router'
        ]
    },
    // 有多少个入口文件,就会生成多少个 js 文件
    output: {
        path: BUILD_PATH,
        filename: 'script/[name].[hash].js'
    },
    module: {
        preLoaders: [
            {
                test: /\.jsx?$/, include: APP_JSX_PATH, loader: 'jshint-loader'
            }
        ],
        loaders: [
            {
                test: /\.css$/,
                // loaders:['style','css'], include: APP_CSS_PATH,
                loader: ExtractTextPlugin.extract('style!css', 'css?sourceMap')
            },{
                test: /\.scss$/, loaders:['style','css','sass'], include: APP_CSS_PATH
            },
            {
                test: /\.(png|jpg)$/, loader:'url?limit=4000&name=assets/images/[hash].[ext]'
            },
            {
                test: /\.(woff|woff2|ttf|eot|svg)(\?]?.*)?$/,
                loader : 'file?name=assets/fonts/[name].[ext]?[hash]'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'AngularJS Demo',
            template: path.resolve(TEM_PATH, 'index.html'),
            filename: 'index.html',
            chunks: ['app'],
            inject: 'html'
        }),
        // 使用 uglifyJs 压缩压缩
        new webpack.optimize.UglifyJsPlugin({minimize: true}),
        // 把入口文件打包成 vendors
        new webpack.optimize.CommonsChunkPlugin("vendor","vendor/bundle.js"),
        new ExtractTextPlugin('[name].css'),
        new CopyWebpackPlugin([
            { from: 'node_modules/bootstrap/dist/css/bootstrap.min.css', to: 'vendor/bootstrap.min.css'},
            { from: 'app/templates/tpls', to: 'templates/tpls'}
        ])
    ],
    devtool: 'eval-source-map',
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true,
        proxy: { // 没有效果,为什么?
            '/api/*' : {
                target: 'http://example.com',
                secure: false
            }
        }
    }
}