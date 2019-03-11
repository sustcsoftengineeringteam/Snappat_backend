const Base = require('./base.js');
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

  async selectAction() {
    let postdata = this.post();
    let username = postdata["username"];
    let phone = postdata["phone"];
    let userinfo = await login(username, phone);
    return userInfo;
    // if (userInfo["errno"] != 0) {
    //   // Login Error
    //   return userInfo;
    // } else {
    //   NowUser = userInfo["data"]["userinfo"];
    // }
  }
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
        "coin": 0,
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
  static async login(username, phone) {
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
};