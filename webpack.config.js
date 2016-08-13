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
    entry: APP_PATH,
    // 输出的文件名,合并以后的 js 会命名为 bundle.js
    output: {
        path: BUILD_PATH,
        filename: 'bundle.js'
    },
    module: {
        preLoaders: [
            {
                test: /\.jsx?$/, include: APP_JSX_PATH, loader: 'jshint-loader'
            }
        ],
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
        })
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