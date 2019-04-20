const Base = require('./base.js');
const uuid = require("uuid");
let Errors = think.config("Errors");


function getFormatData() {
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hour = date.getHours();
  let minute = date.getMinutes();
  let second = date.getSeconds();
  return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
}

function decodeUnicode(str) {
  str = str.replace(/\\/g, "%");
  return unescape(str);
}

function encodeUnicode(str) {
  var res = [];
  for (var i = 0; i < str.length; i++) {
    res[i] = ("00" + str.charCodeAt(i).toString(16)).slice(-4);
  }
  return "\\u" + res.join("\\u");
}
module.exports = class Card extends Base {
  async __before() {
    var _this = this;
    const method = _this.method.toLowerCase();
    _this.header('Access-Control-Allow-Origin', _this.header('origin') || '*');
    _this.header('Access-Control-Allow-Headers', 'x-requested-with');
    _this.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,PUT,DELETE');
    _this.header('Access-Control-Allow-Credentials', true);
    if (method === 'options') {
      _this.end();
    }
    // login and add cookie to ctx;
    let postdata = this.post();
    let username = postdata["username"];
    let phone = postdata["phone"];
    let user = this.model("users");
    if (!this.ctx.cookie("userinfo")) {
      console.log("store cookie");
      if (phone != undefined && username != undefined) {
        const data = await user.where({
          username: username,
          phone: phone
        }).select();
        if (data.length == 1) {
          let userinfo = JSON.stringify(data[0]);
          this.ctx.cookie("userinfo", encodeUnicode(userinfo));
          return;
        } else {
          return this.fail(1003, Errors["1003"]);
        }
      } else {
        return this.fail(1000, Errors["1000"]);
      }
    }
    return;
  }
  /**
   * [查询自己的信息]
   * @api {post} /user/select Select Your Own Info(Login)
   * @apiName Select Your Own Info(Login)
   * @apiVersion 1.0.1
   * @apiGroup User
   * @apiParam {String} username 用户名
   * @apiParam {String} phone 电话号码
   * @apiSuccess {JSONString} userinfo 自己的全部信息
   */
  async selectAction() {
    let postdata = this.post();
    let username = postdata["username"];
    let phone = postdata["phone"];
    let userinfo = JSON.parse(decodeUnicode(this.ctx.cookie("userinfo")));
    return this.success(userinfo);
  }
  /**
   * [获取自己的MysteryList]
   * @api {get} /user/selectMystery Select Your Own Mystery List
   * @apiName Select Your Own Mystery List
   * @apiVersion 1.0.1
   * @apiGroup User
   * @apiSuccess {JSONString} MysteryList 自己的发布的所有MysteryList
   */
  async selectMysteryAction() {
    let postdata = this.post();
    let userinfo = JSON.parse(decodeUnicode(this.ctx.cookie("userinfo")));
    let NowUser = userinfo;
    let data = JSON.parse(NowUser["mystery"]);
    return this.success(data);
  }
  /**
   * [获取自己的HistoryList]
   * @api {get} /user/selectHistory Select Your Own History List
   * @apiName Select Your Own History List
   * @apiVersion 1.0.1
   * @apiGroup User
   * @apiSuccess {JSONString} MysteryList 自己的发布的所有HistoryList
   */
  async selectHistoryAction() {
    let postdata = this.post();
    let userinfo = JSON.parse(decodeUnicode(this.ctx.cookie("userinfo")));
    let NowUser = userinfo;
    let data = JSON.parse(NowUser["history"]);
    return this.success(data);

  }
  /**
   * [获取自己的MessageList]
   * @api {get} /user/selectMessage Select Your Own Message List
   * @apiName Select Your Message List
   * @apiVersion 1.0.1
   * @apiGroup User
   * @apiSuccess {String} MessageList 自己的发布的所有MessageList
   */
  async selectMessageAction() {
    let postdata = this.post();
    let userinfo = JSON.parse(decodeUnicode(this.ctx.cookie("userinfo")));

    let NowUser = userinfo;
    let data = JSON.parse(NowUser["message"]);
    return this.success(data);

  }
  /**
   * [获取某个用户的全部信息]
   * @api {post} /user/selectUser Select User Info by Id
   * @apiName Select User Info by Id
   * @apiVersion 1.0.1
   * @apiGroup User
   * @apiParam {String} username 用户名
   * @apiParam {String} phone 电话
   * @apiParam {Number} select_id 指定id
   * @apiSuccess {JSONString} userinfo 另外一个用户的全部信息
   */
  async selectUserAction() {
    let postdata = this.post();
    let username = postdata["username"];
    let phone = postdata["phone"];
    let selectUserId = postdata["select_id"];
    let userinfo = JSON.parse(decodeUnicode(this.ctx.cookie("userinfo")));
    let NowUser = userinfo
    let user = this.model("users");
    const data = await user.where({
      id: selectUserId
    }).select();
    return this.success(data);
  }

  /**
   * @api {post} /user/addMystery Add a new Mystery
   * @apiName Add a new Mystery
   * @apiVersion 1.0.1
   * @apiGroup Mystery
   * @apiParam {JSONString} mystery
   * @apiParam {String} mystery.hint
   * @apiParam {String} mystery.treasure
   * @apiParam {String} mystery.src
   * @apiParam {Object} mystery.key
   * @apiParam {String} mystery.edata
   * @apiParam {Number} mystery.coins
   * @apiSuccess {JSONString} success 成功返回success,失败返回fail
   * [添加一条Mystery]
   */
  async addMysteryAction() {
    let postdata = this.post();
    let mystery = postdata["mystery"];
    let userinfo = JSON.parse(decodeUnicode(this.ctx.cookie("userinfo")));
    let NowUser = userinfo;

    mystery["coins"] = parseInt(mystery["coins"]);
    let coins = parseInt(NowUser["coins"]);
    if (coins >= mystery["coins"]) {
      coins -= mystery["coins"];
    } else {
      return this.fail(1002, Errors["1002"]);
    }
    let MysteryList = JSON.parse(NowUser["mystery"]);
    mystery["id"] = MysteryList.length + 1;
    mystery["userid"] = NowUser["id"];
    mystery["sdate"] = getFormatData();
    mystery["decoder"] = "[]";
    mystery["favor"] = 0;
    mystery["comment"] = "[]";
    mystery["view"] = "[]";
    MysteryList.push(mystery);
    let MysteryListString = JSON.stringify(MysteryList);

    let user = this.model("users");
    let ans = user.where({
      id: NowUser["id"]
    }).update({
      coins: coins,
      mystery: MysteryListString
    });
    if (ans) {
      return this.success(ans);
    } else {
      return this.fail(1004, Errors["1004"]);
    }
  }
  /**
   * [仅更新一条mystery的破解/点赞/评论/查看(decoder,favor,comment,view)]
   * @api {post} /user/updateMystery Update the decoder/favor/comment/view for a mystery
   * @apiName Update the decoder/favor/comment/view for a mystery
   * @apiVersion 1.0.1
   * @apiGroup Mystery
   * @apiParam {JSONString} mystery
   * @apiParam {ListString} mystery.decoder
   * @apiParam {Number} mystery.favor
   * @apiParam {ListString} mystery.comment
   * @apiParam {Number} mystery.view
   * @apiSuccess {JSONString} success
   * [传过来的mystery务必要有旧的数据(decoder,favor,comment,view),即使你不更新这一项!]
   */
  async updateMysteryAction() {
    let postdata = this.post();
    let mystery = postdata["mystery"];
    let userinfo = JSON.parse(decodeUnicode(this.ctx.cookie("userinfo")));

    let NowUser = userinfo;

    let MysteryList = JSON.parse(NowUser["mystery"])
    let NowMystery = MysteryList[mystery["id"] - 1];
    if (mystery["decoder"].length > 0) {
      NowMystery["decoder"] = mystery["decoder"];
    }
    if (parseInt(mystery["favor"]) > 0) {
      NowMystery["favor"] = mystery["favor"];
    }
    if (mystery["comment"].length > 0) {
      NowMystery["comment"] = mystery["comment"];
    }
    if (parseInt(mystery["view"]) > 0) {
      NowMystery["view"] = mystery["view"];
    }
    let MysteryListString = JSON.stringify(MysteryList);
    let user = this.model("users");
    let ans = user.where({
      id: NowUser["id"]
    }).update({
      mystery: MysteryListString
    });
    if (ans) {
      return this.success(ans);
    } else {
      return this.fail(1004, Errors["1004"]);
    }
  }
  /**
   * [提交破解记录并获得奖励]
   * @api {post} /user/crackMystery Post Decode History
   * @apiName Post Decode History
   * @apiVersion 1.0.1
   * @apiGroup Mystery
   * @apiParam {JSONString} mystery
   * @apiParam {Number} mystery.userid
   * @apiSuccess {JSONString} success 不严谨的判断,只有最后数据成功会返回success,登录失败返回fail,高并发数据库响应出错不负责
   */
  async crackMysteryAction() {
    let postdata = this.post();
    let mystery = postdata["mystery"];
    let Cracker;
    let userinfo = JSON.parse(decodeUnicode(this.ctx.cookie("userinfo")));

    Cracker = userinfo;

    let user = this.model("users");
    let History = JSON.parse(Cracker["histroy"]);
    //防止客户端穿过来错误信息或发生raceCondition状况
    mystery = JSON.parse(user.where({
      id: mystery["userid"]
    }).select()[0]["mystery"]);
    //为自己的history添加破解记录
    let history = {
      "id": mystery["id"],
      "userid": mystery["userid"],
      "date": getFormatData()
    };
    History.push(history);
    let HistoryString = JSON.stringify(History);
    //为mystery添加decoder记录
    let userinfo = user.where({
      id: mystery["userid"]
    }).select();
    let MysteryUser = userinfo[0];
    let MysteryList = JSON.parse(MysteryUser["mystery"]);
    let decoderList = JSON.parse(MysteryList[mystery["id"] - 1]["decoder"]);
    decoderList.push(Cracker["id"]);
    let docoderOrder = decoderList.length;
    let decoderListString = JSON.stringify(decoderList);
    MysteryList[mystery["id"] - 1]["decoder"] = decoderListString;
    let MysteryListString = JSON.stringify(MysteryList);
    user.where({
      id: mystery["userid"]
    }).update({
      mystery: MysteryListString
    });

    //获得破解的bonus
    mystery["coins"] = parseInt(mystery["coins"]);
    let coins = parseInt(Cracker["coins"]);
    if (mystery["coins"] > 0) {
      if (docoderOrder == 1) {
        coins += parseInt(mystery["coins"] * 0.5);
      }
      if (docoderOrder == 2) {
        coins += parseInt(mystery["coins"] * 0.3);
      }
      if (docoderOrder == 3) {
        coins += parseInt(mystery["coins"] * 0.2);
      }
      if (docoderOrder > 3) {
        coins += parseInt(mystery["coins"] * 0.05);
      }
    }
    let res = user.where({
      id: Cracker["id"]
    }).update({
      coins: coins,
      history: HistoryString
    });
    return this.success(res);
  }
};