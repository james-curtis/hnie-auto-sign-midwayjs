# 某高校疫情防控自动签到打卡

## 使用

可以配合 [阿里云效](https://devops.aliyun.com/) 或者 [coding](https://coding.net/)，只要是跑在国内服务器都可以

**使用步骤**

1. 先注册阿里云账号
2. 然后进入[云效得devops](https://devops.console.aliyun.com/organizations)
   - 在这里界面中点击创建企业
   - ![](https://tva1.sinaimg.cn/large/008d89Swgy1h5mbadobmlj31hc0swna5.jpg)
   - ![](https://tva1.sinaimg.cn/large/008d89Swgy1h5mbbfhu1qj30mu0fpabl.jpg)
   - 然后点击立即体验，进入就好
   - 接着就会进入如下界面
   - ![](https://tva1.sinaimg.cn/large/008d89Swgy1h5mbcmdigsj31hc0swtni.jpg)
3. 进入 `代码管理`。在右上角找到 `导入代码库`
   - ![](https://tva1.sinaimg.cn/large/008d89Swgy1h5mbdpyvlij31hc0swajs.jpg)
   - 按照下面示例进行填写，仓库地址是：`https://github.com/james-curtis/hnie-auto-sign.git`
   - ![](https://tva1.sinaimg.cn/large/008d89Swgy1h5mbehv5e7j30lf0mytbr.jpg)
4. 流水线设置
   - 点击左侧的 `流水线`
   - ![](https://tva1.sinaimg.cn/large/008d89Swgy1h5mbfujlvyj309s0g0wfo.jpg)
   - 跳转页面之后，点击右上角的 `创建流水线`
   - 创建模板选择 `其他·空模板`
   - ![](https://tva1.sinaimg.cn/large/008d89Swgy1h5mbj74qhtj31hc0swn83.jpg)
   - 然后会自动弹出 `流水线源`，然后按照图示进行设置
   - ![](https://tva1.sinaimg.cn/large/008d89Swgy1h5mbkf4l59j31hc0swwm2.jpg)
   - 然后选择 `阶段1` 中的 `空任务`
   - 在右侧弹出面板中，将任务名修改为 `签到打卡`
   - 点击右侧面板中下侧的 `添加步骤`，选择 `构建->Node.js构建`
   - ![](https://tva1.sinaimg.cn/large/008d89Swgy1h5mbnyix7qj31hc0swjz1.jpg)
   - 现在你的界面应该是这样的
   - ![](https://tva1.sinaimg.cn/large/008d89Swgy1h5mboqhzt7j30dw0nhdho.jpg)
   - `版本选择方式` 修改为 `输入指定版本`
   - `请填写 Node 版本` 修改为 `16`
   - `构建命令` 填写为如下
    ```shell
    npm ci
    npm run build
    npm run start
    ```
   - 此刻你的界面应该是这样
   - ![](https://tva1.sinaimg.cn/large/008d89Swgy1h5mfbszcb3j31hc0swahi.jpg)
5. 配置邮件通知
   - 在刚才步骤的基础之上，再选择 `添加插件` -> `邮件通知`
   - ![](https://tva1.sinaimg.cn/large/008d89Swgy1h5mfdotwqsj30fc0kitak.jpg)
   - 完成之后，你的界面应该是这样的
   - ![](https://tva1.sinaimg.cn/large/008d89Swgy1h5mftnxhxtj30e10aqdgb.jpg)
6. 配置定时任务
   - 接着配置定时触发该流水线
   - 点击顶部的 `触发设置`
   - ![](https://tva1.sinaimg.cn/large/008d89Swgy1h5mfficotyj30wu0aw75c.jpg)
   - 按照下图进行配置即可
   - ![](https://tva1.sinaimg.cn/large/008d89Swgy1h5mfg11cjnj30t50etq4d.jpg)
7. 修改流水线名称（可选）
   - 点击顶部的 `基本信息`
   - 在 `流水线信息` 中，将 `流水线名称` 修改为 `易班签到打卡`，如下图所示
   - ![](https://tva1.sinaimg.cn/large/008d89Swgy1h5mfi65d1oj31440kp0u6.jpg)
8. 保存流水线，点击最右上角的 `仅保存` 按钮
9. 配置签到账号信息
   - 回到 `codeup` 代码管理界面，如果找不到可以点击最左上角的九个点，打开 `研发->代码管理` 就能找到仓库了
   - 选中 `.env` 文件，再点击右侧的编辑按钮
   - ![](https://tva1.sinaimg.cn/large/008d89Swgy1h5mfli0ey1j31hc0swtjp.jpg)
   - 填写你自己的签到信息之后点击保存即可（如果你的是JSON格式，那么最外层就应该用单引号。我这里是使用的JSON5，里面的内容都是单引号，所以最外层用的是双引号）
   - ![](https://tva1.sinaimg.cn/large/008d89Swgy1h5mfngepjoj30qf0o478y.jpg)
   - ![](https://tva1.sinaimg.cn/large/008d89Swgy1h5mfnwxftqj30i509nt9w.jpg)
10. 运行流水线进行测试
    - 现在回到流水线，测试一下能不能跑的通
    - ![](https://tva1.sinaimg.cn/large/008d89Swgy1h5mfp9c9roj31hc0sw44m.jpg)
    - 进入日志，查看运行情况
    - ![](https://tva1.sinaimg.cn/large/008d89Swgy1h5mfpuzmayj30lf0bt3zf.jpg)
    - 在弹出的窗口中，在左侧的 `构建` 选择 `Node.js 构建`，然后拉到最底下，此时应该可以看到提示信息
    - ![](https://tva1.sinaimg.cn/large/008d89Swgy1h5mfra84eij31hc0swamm.jpg)
11. 至此操作已经全部完成，第二天会按照预设的时间进行打卡，运行结果会进行邮件通知
12. 邮件通知大概长这样
    - ![](https://tva1.sinaimg.cn/large/008d89Swgy1h5mg0ey3u5j30oc0hlgmv.jpg)


## 数据格式

签到JSON数据的Schema请参阅：[schema.json](./dcos/schema.json)

签到数据示例：
```json5
[
  // 每一个对象就是一个签到账号
  {
    "account": {
      // 账号，这里的账号密码是http://xggl.hnie.edu.cn/这个网站的
      "account": "demo",
      // 密码，默认是Hnie@身份证后六位
      "password": "Hnie@demo"
    },
    "signFormData": {
      // 签到所在地（地图api定位结果）
      "address": "湖南省郴州市北湖区五岭大道9号",
      // 签到所在地经纬度
      "position": "113.014999,25.7706",
      // 签到地址（精确的县级）
      "signAddress": "湖南省郴州市",
      // 省会邮编
      "provinceZipCode": "430000",
      // 市中心邮编
      "cityZipCode": "431000",
      // 县中心邮编
      "countyZipCode": "431081",
      // 现居地详细地址
      "habitationDetailDesc": "湖南省郴州资兴市鲤鱼江KFC",
      // 常住地详细地址
      "usualResidenceDetailDesc": "湖南省郴州资兴市鲤鱼江KFC",
      // 手机号
      "phone": "15971115555"
    }
  },
  {
    "account": {
      "account": "demo",
      "password": "Hnie@demo"
    },
    "signFormData": {
      "address": "湖南省郴州市北湖区五岭大道9号",
      "position": "113.014999,25.7706",
      "signAddress": "湖南省郴州市",
      "provinceZipCode": "430000",
      "cityZipCode": "431000",
      "countyZipCode": "431081",
      "habitationDetailDesc": "湖南省郴州资兴市鲤鱼江KFC",
      "usualResidenceDetailDesc": "湖南省郴州资兴市鲤鱼江KFC",
      "phone": "15971115555"
    }
  }
]
```

## 验证配置是否正确

请使用 [Json Schema Validator](https://www.jsonschemavalidator.net/)，左边填写[schema.json](./dcos/schema.json)中的内容，右边填写你的配置

示例：
![img](https://tva1.sinaimg.cn/large/008d89Swgy1h5lsymyxakj31hc0m1gvf.jpg)

## 注意
海外ip好像无法签到，打开页面会显示 `502`

返回数据长这样
```text
***31m    data: '<html>\r\n' +***39m
***31m      '<head><title>502 Bad Gateway</title></head>\r\n' +***39m
***31m      '<body bgcolor="white">\r\n' +***39m
***31m      '<center><h1>Notice:502 Bad Gateway</h1></center>\r\n' +***39m
***31m      '<!-- a padding to disable MSIE and Chrome friendly error page -->\r\n' +***39m
***31m      '<!-- a padding to disable MSIE and Chrome friendly error page -->\r\n' +***39m
***31m      '<!-- a padding to disable MSIE and Chrome friendly error page -->\r\n' +***39m
***31m      '<!-- a padding to disable MSIE and Chrome friendly error page -->\r\n' +***39m
***31m      '<!-- a padding to disable MSIE and Chrome friendly error page -->\r\n' +***39m
***31m      '<!-- a padding to disable MSIE and Chrome friendly error page -->\r\n'***39m
```
## 常见问题

### 1. 配置写在.env中不会泄露吗
> 如果你开放了权限给别人看了话是有可能会泄露的。
>
> 因此我也提供了第二种配置的方式：
>
> 将配置信息写进环境变量中，效果如下
>
> ![](https://tva1.sinaimg.cn/large/008d89Swgy1h5mghnvtv6j31hc0swdod.jpg)
>
> 只可惜的是云效这里不能直接写一个JSON进去，需要base64编码一下才能写入进去。
>
> 步骤如下：
>
> 1. 随便找一个在线base64的网站，例如：https://base64.us/
> 2. 把你的配置输入进去，如下图所示
> 3. ![](https://tva1.sinaimg.cn/large/008d89Swgy1h5mglkcly2j31hc0swn6l.jpg)
> 4. 然后复制编码之后的值
> 5. 回到云效，点开之前创建的流水线，点击顶部的 `变量和缓存`，在 `字符变量` 右侧点击 `新建变量`
> 6. 然后按照下图示例进行填写，变量名是 `SIGN_CONFIG_BASE64`
> 7. ![](https://tva1.sinaimg.cn/large/008d89Swgy1h5mgo1jzphj31hc0swqar.jpg)
> 8. 添加之后再点击右上角的 `仅保存` 即可
> 9. 然后你退出重进，会发现这个变量只能被替换，不能被读取了
>
> **提示**：环境变量的优先级是最高的。
>
> 如果同时设置 `.env` `.env.local` `环境变量`
>
> 其中的优先级是：`环境变量` > `.env.local` > `.env`
