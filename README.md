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

### [腾讯云函数配置](https://console.cloud.tencent.com/)

1. 下拉项目或者 download zip

![img.png](assets/cloud-option.png)

2. 函数执行入口修改 /index.js

```javascript
const app = require('./app');

exports.main = async (event, context) => {
    await app();
  };
  
```
3. 新建云函数服务
![img_1.png](assets/cloud-option-1.png)
   
4. 配置云函数服务
![img_2.png](assets/cloud-option-2.png)
   
![腾讯云函数](assets/cloud-tencent.png)

![img_3.png](assets/cloud-option-3.png)

![img_4.png](assets/cloud-option-4.png)

![img_5.png](assets/cloud-option-5.png)

触发时间：每天早上 7:30  __0 30 7 * * * *__

![img_6.png](assets/cloud-option-6.png)

4. 配置完成后的云函数代码

![img_7.png](assets/cloud-option-7.png)
   
记得一定要安装依赖哦

![img_8.png](assets/cloud-option-8.png)

测试时记得投币任务中投币注释了，避免投币过多，测试完成后解除注释，放心跑就行了

![img_9.png](assets/cloud-option-9.png)

_关于腾讯云函数时间显示不准确问题_

设置函数配置的环境变量

```
TZ=Asia/Shanghai
```

![云函数环境配置](assets/cloud-tencent-env.png)
