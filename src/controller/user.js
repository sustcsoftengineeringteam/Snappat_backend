const Base = require('./base.js');
const uuid = require("uuid");
let Errors = think.config("Errors");

let success = function(datajson) {
  if (datajson == undefined) {
    return {
      "errno": 0,
      "errmsg": ""
    };
  }
  return {
    "errno": 0,
    "errmsg": "",
    "data": datajson
  };
};
let fail = function(num, msg) {
  if (num == undefined) {
    num = 1009;
  }
  if (msg == undefined) {
    msg = "Undeclared error.";
  }
  return {
    "errno": num,
    "errmsg": msg
  };
};

var login = async function(username, phone) {
  let user = think.model("users");
  if (phone != undefined && username != undefined) {
    const data = await user.where({
      username: username,
      phone: phone
    }).select();
    if (data.length == 1) {
      return success({
        "userinfo": data[0]
      });
    } else {
      return fail(1003, Errors["1003"]);
    }
  } else {
    return fail(1000, Errors["1000"]);
  }
}

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
module.exports = class Card extends Base {
  __before() {
    var _this = this;
    const method = _this.method.toLowerCase();
    _this.header('Access-Control-Allow-Origin', _this.header('origin') || '*');
    _this.header('Access-Control-Allow-Headers', 'x-requested-with');
    _this.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,PUT,DELETE');
    _this.header('Access-Control-Allow-Credentials', true);
    if (method === 'options') {
      _this.end();
    }
  }
  /**
   * [查询自己的信息]
   * @para {username},{phone}
   * @return {userInfo} [自己的全部信息]
   */
  async selectAction() {
    let postdata = this.post();
    let username = postdata["username"];
    let phone = postdata["phone"];
    let userinfo = await login(username, phone);
    if (userinfo["errno"] == 0) {
      return this.success(userinfo["data"]);
    } else {
      this.fail(userinfo["errno"], userinfo["errmsg"]);
    }

  }
  /**
   * [获取自己的MysteryList]
   * @para {username},{phone}
   * @return {MysteryList} [自己的发布的所有MysteryList]
   */
  async selectMysteryAction() {
    let postdata = this.post();
    let username = postdata["username"];
    let phone = postdata["phone"];
    let userinfo = await login(username, phone);
    if (userInfo["errno"] != 0) {
      // Login Error
      return userInfo;
    } else {
      NowUser = userInfo["data"]["userinfo"];
      let data = JSON.parse(NowUser["mystery"]);
      return this.success(data);
    }
  }
  /**
   * [获取自己的HistoryList]
   * @para {username},{phone}
   * @return {MysteryList} [自己的发布的所有HistoryList]
   */
  async selectHistoryAction() {
    let postdata = this.post();
    let username = postdata["username"];
    let phone = postdata["phone"];
    let userinfo = await login(username, phone);
    if (userInfo["errno"] != 0) {
      // Login Error
      return userInfo;
    } else {
      NowUser = userInfo["data"]["userinfo"];
      let data = JSON.parse(NowUser["history"]);
      return this.success(data);
    }
  }
  /**
   * [获取自己的MessageList]
   * @para {username},{phone}
   * @return {MessageList} [自己的发布的所有MessageList]
   */
  async selectMessageAction() {
    let postdata = this.post();
    let username = postdata["username"];
    let phone = postdata["phone"];
    let userinfo = await login(username, phone);
    if (userInfo["errno"] != 0) {
      // Login Error
      return userInfo;
    } else {
      NowUser = userInfo["data"]["userinfo"];
      let data = JSON.parse(NowUser["message"]);
      return this.success(data);
    }
  }
  /**
   * [获取某个用户的全部信息]
   * @para {username},{phone},{select_id}
   * @return {userInfo} [另外一个用户的全部信息]
   */
  async selectUserAction() {
    let postdata = this.post();
    let username = postdata["username"];
    let phone = postdata["phone"];
    let selectUserId = postdata["select_id"];
    let userinfo = await login(username, phone);
    if (userInfo["errno"] != 0) {
      // Login Error
      return userInfo;
    } else {
      NowUser = userInfo["data"]["userinfo"];
    }
    let user = this.model("users");
    const data = await user.where({
      id: selectUserId
    }).select();
    return this.success(data);
  }
  /**
   * [注册一个新用户]
   * @para {phone}
   * @return {success} [成功返回默认success,失败返回fail和error code]
   */
  async registryAction() {
    let postdata = this.post();
    let phone = postdata["phone"];
    // let ans = await SMS_verification(phone);
    let ans = true; //测试期间开放验证
    if (ans) {
      let user = this.model("users");
      //重复检测
      let repeat_user = await user.where({
        phone: phone
      }).select();
      if (repeat_user.length != 0) {
        return this.fail(1001, Errors["1001"]);
      }
      let add_data = await user.add({
        "username": "未命名",
        "phone": phone,
        "description": "",
        "gender": "男",
        "coins": 0,
        "avator": "",
        "follower": "[]",
        "star": "[]",
        "mystery": "[]",
        "history": "[]",
        "message": "[]"
      });
      return this.success(add_data);
    }
  }
  /**
   * [添加一条Mystery]
   * @para {username},{phone},{mystery}
   * @return {success} [成功返回success,失败返回fail]
   */
  async addMysteryAction() {
    let postdata = this.post();
    let username = postdata["username"];
    let phone = postdata["phone"];
    let mystery = postdata["mystery"];
    let userinfo = await login(username, phone);
    if (userInfo["errno"] != 0) {
      // Login Error
      return userInfo;
    } else {
      NowUser = userInfo["data"]["userinfo"];
    }
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
   * @para {username},{phone},{mystery}
   * @return {success}
   * @ps 传过来的mystery务必要有旧的数据(decoder,favor,comment,view),即使你不更新这一项!
   */
  async updateMysteryAction() {
    let postdata = this.post();
    let username = postdata["username"];
    let phone = postdata["phone"];
    let mystery = postdata["mystery"];
    let userinfo = await login(username, phone);
    if (userInfo["errno"] != 0) {
      // Login Error
      return userInfo;
    } else {
      NowUser = userInfo["data"]["userinfo"];
    }
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

  async crackMysteryAction() {
    let postdata = this.post();
    let username = postdata["username"];
    let phone = postdata["phone"];
    let mystery = postdata["mystery"];
    let userinfo = await login(username, phone);
    if (userInfo["errno"] != 0) {
      // Login Error
      return userInfo;
    } else {
      Cracker = userInfo["data"]["userinfo"];
    }
    let user = this.model("users");
    let History = JSON.parse(Cracker["histroy"]);
    //为自己的history添加破解记录
    let history = {
      "id": mystery["id"],
      "userid": mystery["userid"],
      "date": getFormatData()
    };
    History.push(history);
    let HistoryString = JSON.stringify(History);
    //为mystery添加decoder记录
    let userInfo = user.where({
      id: mystery["userid"]
    }).select();
    let MysteryUser = userInfo[0];
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
    user.where({
      id: Cracker["id"]
    }).update({
      coins: coins,
      history: HistoryString
    });

  }

};