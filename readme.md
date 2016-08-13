angularJS1 + webpack, 支持 scss

### question

1. 目前是通过在 webpack.config.js 中配置,使用插件 HtmlwebpackPlugin 生成一个 html 文件

如果我们有自己的 index.html ,如何设置呢?
答:不使用插件,直接在 build 下面新建一个 index.html ,并在里面引用合成后的文件地址