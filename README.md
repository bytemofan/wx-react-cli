# 微信微站脚手架 react 初始化模板

## 计划功能

- [x] 使用webpack2.0 
- [x] 集成webpack chunk
- [x] 集成eslint
- [x] 集成hot-reload
- [x] 集成css Autoprefixer前缀自动补全 
- [x] 集成sass
- [x] 集成css-modules
- [x] 集成sprite自动生成和编译成样式
- [x] 集成imagemin图片压缩
- [x] 集成source-map
- [x] 集成rem   
- [x] 集成单元测试
- [x] 集成数据mock
- [x] 集成自动ftp部署到测试服务器


## 使用说明：

首先:

```bash
$ npm install
```

### dev环境

```bash
$ npm run dev
```

或者：
```bash
$ npm run start
```

### mock假数据

```bash
$ npm run mock
```

mock假数据配置方式，参考文件`mock/_mockserver.json`。

### 运行测试

```bash
$ npm run test
```

单元测试写在`test/`文件夹下。

### prod环境(打包，构建)

```bash
$ npm run prod
```

