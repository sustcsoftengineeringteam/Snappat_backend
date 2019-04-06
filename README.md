
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
    src:"",//用户发布的图片链接(在客户端上传,服务器不管上传和储存,只储存一个src)
    key:{},//用于验证解密的key,一个特殊的json来表示发布时对应的objects
    sdate:'2019-12-10 22:10:03', //发布的时间
    edate:"2019-12-11 10:10:00", //谜题过期时间
    coins: 100, // 为解开谜题的cracker提供的bonus
    decoder:[1], //解开该谜题的用户id
    favor:0, //点赞数量
    comment:[], //评论内容
    view:[], //查看过该谜题的用户id
  }
  ,...
]
addMystery时只需提供
{
  hint:"",
  treasure:"",
  src:"",
  key:{},
  edate:"",
}
//Because
mystery["id"] = MysteryList.length+1;
MysteryList.push(this mystery);
MysterList[mystery["id"]-1]=this mystery.
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
    type:1,//消息类型,可选值有3: 1表示有人favor了你发布的mystery; 2表示有人comment了你的mystery; 3表示有人解开了你的mystery
    read:1, //是否已阅,1为已阅,0为未读
  }
]
```
