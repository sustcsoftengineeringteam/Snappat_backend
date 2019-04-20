const test = require('ava');
const path = require('path');
const assert = require('assert');
require(path.join(process.cwd(), 'production.js'));

test('user_registry_and_select', async function(t) {
  const user = think.model('users');
  let add_data = await user.add({
    "username": "测试用户",
    "phone": "00000000000",
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
  let userinfo = await user.where({
    id: add_data
  }).select();
  assert.equal(userinfo[0]["id"], add_data);
});

test('user_select_mystery', async function(t) {
  const user = think.model('users');
  let userinfo = await user.where({
    id: 2
  }).select();
  assert.equal(JSON.parse(userinfo[0]["mystery"]).length, 0);
});