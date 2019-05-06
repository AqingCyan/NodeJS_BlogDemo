/**
 * 登录
 * @param username 用户名
 * @param password 密码
 */
const loginCheck = (username, password) => {
  return username === 'zhangsan' && password === '123'
}

module.exports = {
  loginCheck
}
