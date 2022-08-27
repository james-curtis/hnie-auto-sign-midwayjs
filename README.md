# 某高校疫情防控自动签到打卡

## 使用

可以配合 [阿里云效](https://devops.aliyun.com/) 或者 [coding](https://coding.net/)，只要是跑在国内服务器都可以

## 数据格式

签到JSON数据的Schema请参阅：[schema.json](./dcos/schema.json)

签到数据示例：
```json5
[
  // 每一个对象就是一个签到账号
  {
    "account": {
      // 账号
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
