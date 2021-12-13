# 哔哩哔哩-日常任务

## 功能
- 集成钉钉推送
- 日志推送与任务剥离
- 多任务执行

## 使用
### node环境
配置  /config.json文件
```json
{
  "cookie": "",
  "ding": {
    "webhook": "",
    "secret": ""
  }
}
```
cookie 在[bilibili](https://www.bilibili.com/) 官网登录后，控制台找到接口获取
![cookie 获取](assets/bilibili.png)

ding 配置
![ding 配置](assets/ding.png)

备注：__默认在node环境运行__

### [腾讯云函数](https://console.cloud.tencent.com/)

函数执行入口修改 /index.js

```javascript
const app = require('./app');

exports.main = async (event, context) => {
    await app();
  };
  
```

![腾讯云函数](assets/cloud-tencent.png)

