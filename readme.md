webpack + angularjs 基础包

```
开发模式配置文件 webpack.config.js
运行命令: npm start

部署时配置文件为 webpack.production.config.js
运行命令: npm run build
将会在 build 目录下生成目录文件
```

#### 关于测试数据

```
1. 安装 npm install -g json-server
2. 建立测试数据文件
json 文件: json-server --watch mock/db.json
js   文件: json-server --watch mock/db2.js

运行命令后, json-server 会提示你访问地址

如果需要指定端口:
json-server --watch mock/db.json --port 9090
```