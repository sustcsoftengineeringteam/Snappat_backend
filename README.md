
Application created by [ThinkJS](http://www.thinkjs.org)

## Install dependencies

```
npm install
```

## Start server

```
npm start
```

## Deploy with pm2

Use pm2 to deploy app on production enviroment.

```
pm2 startOrReload pm2.json
```


# Database Instruction
#users
![](https://i.loli.net/2019/03/11/5c85d69b6a046.png)
```
//mystery JSON List结构描述
[
  {
    id:10,//发布的mystery id
    userid:0,//mystery所属用户id
    hint:text, //mystery对应的hint
    treasure:'some important msg', //mystery对应的msg
    sdate:'2019-12-10 22:10:03', //发布的时间
    edate:"2019-12-11 10:10:00", //谜题过期时间
    decoder:[1], //解开该谜题的用户id
    favor:0, //点赞数量
    comment:[], //评论内容
    view:[], //查看过该谜题的用户id
  }
  ,...
]
```

```
//history JSON List结构描述
[
  {
    id:9,//解密出的mystery id
    userid:1,//该mystery所属userid
    date:"2019-12-10 22:10:03", //解密出的时间
  }
  ,...
]
```

```
//message JSON List数据结构
[
  {
    content:"",//msg内容
    user:"",//来源用户
    type:1,//消息类型,可选值有3: 1表示有人favor了你发布的mystery; 2表示有人comment了你的mystery; 3表示有人
  }
]
```
