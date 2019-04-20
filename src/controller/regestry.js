module.exports = class extends think.Controller {
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
  };
  testAction() {
    let postdata = this.post();
    if (postdata["name"] != undefined) {
      return this.success("你好");
    }
  }
  /**
   * [注册一个新用户]
   * @api {post} /regestry/registry Registry
   * @apiName Registry
   * @apiVersion 1.0.1
   * @apiGroup User
   * @apiParam {String} username (非必须)用户名
   * @apiParam {String} phone 电话号码
   * @apiSuccess {Number} userid 自己的id
   */
  async registryAction() {
    let postdata = this.post();
    let phone = postdata["phone"];
    let username = postdata["username"];
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
      if (username == undefined)
        username = "未命名"
      let add_data = await user.add({
        "username": username,
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
  };
};