const {exec} = require('../db/mysql')
/**
 * 登录
 * @param username 用户名
 * @param password 密码
 */
const loginCheck = (username, password) => {
  const sql = `select username, realname from users where username='${username}' and password='${password}'`
  return exec(sql).then(data => {
    return data[0] || {} // 防止返回为空
  })
}

module.exports = {
  loginCheck
}
