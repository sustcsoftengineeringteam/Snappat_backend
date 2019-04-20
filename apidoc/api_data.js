define({ "api": [  {    "type": "post",    "url": "/user/addMystery",    "title": "Add a new Mystery",    "name": "Add_a_new_Mystery",    "version": "1.0.1",    "group": "Mystery",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "JSONString",            "optional": false,            "field": "mystery",            "description": ""          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "mystery.hint",            "description": ""          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "mystery.treasure",            "description": ""          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "mystery.src",            "description": ""          },          {            "group": "Parameter",            "type": "Object",            "optional": false,            "field": "mystery.key",            "description": ""          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "mystery.edata",            "description": ""          },          {            "group": "Parameter",            "type": "Number",            "optional": false,            "field": "mystery.coins",            "description": ""          }        ]      }    },    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "JSONString",            "optional": false,            "field": "success",            "description": "<p>成功返回success,失败返回fail [添加一条Mystery]</p>"          }        ]      }    },    "filename": "src/controller/user.js",    "groupTitle": "Mystery"  },  {    "type": "post",    "url": "/user/crackMystery",    "title": "Post Decode History",    "name": "Post_Decode_History",    "version": "1.0.1",    "group": "Mystery",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "JSONString",            "optional": false,            "field": "mystery",            "description": ""          },          {            "group": "Parameter",            "type": "Number",            "optional": false,            "field": "mystery.userid",            "description": ""          }        ]      }    },    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "JSONString",            "optional": false,            "field": "success",            "description": "<p>不严谨的判断,只有最后数据成功会返回success,登录失败返回fail,高并发数据库响应出错不负责</p>"          }        ]      }    },    "filename": "src/controller/user.js",    "groupTitle": "Mystery"  },  {    "type": "post",    "url": "/user/updateMystery",    "title": "Update the decoder/favor/comment/view for a mystery",    "name": "Update_the_decoder_favor_comment_view_for_a_mystery",    "version": "1.0.1",    "group": "Mystery",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "JSONString",            "optional": false,            "field": "mystery",            "description": ""          },          {            "group": "Parameter",            "type": "ListString",            "optional": false,            "field": "mystery.decoder",            "description": ""          },          {            "group": "Parameter",            "type": "Number",            "optional": false,            "field": "mystery.favor",            "description": ""          },          {            "group": "Parameter",            "type": "ListString",            "optional": false,            "field": "mystery.comment",            "description": ""          },          {            "group": "Parameter",            "type": "Number",            "optional": false,            "field": "mystery.view",            "description": ""          }        ]      }    },    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "JSONString",            "optional": false,            "field": "success",            "description": "<p>[传过来的mystery务必要有旧的数据(decoder,favor,comment,view),即使你不更新这一项!]</p>"          }        ]      }    },    "filename": "src/controller/user.js",    "groupTitle": "Mystery"  },  {    "type": "post",    "url": "/user/selectUser",    "title": "Select User Info by Id",    "name": "Select_User_Info_by_Id",    "version": "1.0.1",    "group": "User",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "username",            "description": "<p>用户名</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "phone",            "description": "<p>电话</p>"          },          {            "group": "Parameter",            "type": "Number",            "optional": false,            "field": "select_id",            "description": "<p>指定id</p>"          }        ]      }    },    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "JSONString",            "optional": false,            "field": "userinfo",            "description": "<p>另外一个用户的全部信息</p>"          }        ]      }    },    "filename": "src/controller/user.js",    "groupTitle": "User"  },  {    "type": "get",    "url": "/user/selectMessage",    "title": "Select Your Own Message List",    "name": "Select_Your_Message_List",    "version": "1.0.1",    "group": "User",    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "MessageList",            "description": "<p>自己的发布的所有MessageList</p>"          }        ]      }    },    "filename": "src/controller/user.js",    "groupTitle": "User"  },  {    "type": "get",    "url": "/user/selectHistory",    "title": "Select Your Own History List",    "name": "Select_Your_Own_History_List",    "version": "1.0.1",    "group": "User",    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "JSONString",            "optional": false,            "field": "MysteryList",            "description": "<p>自己的发布的所有HistoryList</p>"          }        ]      }    },    "filename": "src/controller/user.js",    "groupTitle": "User"  },  {    "type": "post",    "url": "/user/select",    "title": "Select Your Own Info(Login)",    "name": "Select_Your_Own_Info_Login_",    "version": "1.0.1",    "group": "User",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "username",            "description": "<p>用户名</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "phone",            "description": "<p>电话号码</p>"          }        ]      }    },    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "JSONString",            "optional": false,            "field": "userinfo",            "description": "<p>自己的全部信息</p>"          }        ]      }    },    "filename": "src/controller/user.js",    "groupTitle": "User"  },  {    "type": "get",    "url": "/user/selectMystery",    "title": "Select Your Own Mystery List",    "name": "Select_Your_Own_Mystery_List",    "version": "1.0.1",    "group": "User",    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "JSONString",            "optional": false,            "field": "MysteryList",            "description": "<p>自己的发布的所有MysteryList</p>"          }        ]      }    },    "filename": "src/controller/user.js",    "groupTitle": "User"  }] });
