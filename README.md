# @kxgo/easy-mock

`easy-mock`只需一些简单的配置就可以轻松`mock`数据

### 安装
--------
```
npm i easy-mock
or
yarn add easy-mock
```

### 使用
--------
``` javascript
const path = require('path')
const easyConfigMock = require('easy-config-mock')

new easyConfigMock({
  // 请传递完整的配置文件路径进去，服务是会自动刷新
  path: path.resolve(__dirname, 'xxxx.js')
})
```
`配置文件的例子`
``` javascript
// xxxx.js
module.exports = {
  // common选项不是必须, 内置的配置如下，当然你也可以更改
  common: {
    // mock服务的默认端口，如果端口被占用，会换一个
    port: 8018,
    // 如果你想看一下ajax的loading效果，该配置项可以设置接口的返回延迟
    timeout: 500,
    // 如果你想看一下接口请求失败的效果，将rate设置成0就可以了，rate取值范围0~1，代表成功的概率
    rate: 1,
    // mock属性为false的话可以关闭掉mock服务
    mock: true,
    // 是否打印调试信息
    debug: false
  },
  // api...，可以不用写全，写最后一个就好
  'getList': {
    code: 0,
    'data|5': [{
      'uid|1000-99999': 999,
      'name': '@cname'
    }],
    result: true
  },
  '/pkApi/getPerson': {
    code: 0,
    'data|5': [{
      'name': '@cname'
    }],
    result: true
  },
  '/pkApi/getOther': {
    code: 0,
    'data|5': [{
      'name': '@cname'
    }],
    result: true
  }
}
```
服务启动后，打开`http://127.0.0.1:8018/pkApi/getPerson`就可以看到mock的数据了！

### 本地debug
```
npm i kxg -g
npm i nodemon -g

npm run dev
```

### 发布
```
npm i standard-version -g
npm run pub
```

### Q&A
--------
##### 1 怎么去mock jsonp
在链接后面传`callback`参数就好了
##### 2 怎么去mock数据
参考[mock rule](http://mockjs.com/examples.html)
##### 3 怎么去处理更复杂的场景，我想要自定义数据返回
``` javascript
module.exports = {
  ...
  ['/pkApi/getOther'] (req, res) {
    const query = req.query
    // 可以自己写处理逻辑
    return {}
  }
  ...
}
```
`get`类型的请求可以通过`req.query`去获取参数

`post`类型的请求可以通过`req.body`去获取参数

### issues
-----------
[issue list](https://github.com/kxgo/easy-mock/issues)

### changelog

[changelog](./CHANGELOG.md)

