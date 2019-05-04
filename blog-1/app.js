const serverHandle = (req, res) => {
  // 设置返回格式
  res.setHeader('Content-type', 'application/json')
  const resData = {
    name: 'Aqing',
    age: 20,
    env: process.env.NODE_ENV // process是node的一个全局变量，可以获取当前环境是什么环境
  }
  res.end(JSON.stringify(resData))
}

module.exports = serverHandle

// 抽离模块：app.js处理业务
