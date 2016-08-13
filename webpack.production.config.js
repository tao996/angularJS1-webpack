var path = require('path');

var HtmlwebpackPlugin = require ('html-webpack-plugin');
var webpack = require('webpack');

// 定义一些文件夹的路径
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var APP_JSX_PATH = path.resolve(APP_PATH,'js');
var APP_CSS_PATH = path.resolve(APP_PATH,'css');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');

module.exports = {
    // 项目文件夹,可以直接用文件夹名称,默认会找到 index.js
    entry: {
        app: path.resolve(APP_PATH, 'index.js'),
        vendor: [
            'angular',
            'angular-ui-router',
            'angular-animate',
            'angular-mocks'
        ]
    },
    // 输出的文件名,合并以后的 js 会命名为 bundle.js
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
            title: 'Hello World app'
        }),
        new webpack.ProvidePlugin({ // 全局变量
            $: "jquery", jQuery: "jquery"
        }),
        // 使用 uglifyJs 压缩压缩
        new webpack.optimize.UglifyJsPlugin({minimize: true}),
        // 把入口文件打包成 vendors
        // new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js')
    ]
}