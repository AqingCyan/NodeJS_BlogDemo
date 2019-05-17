const querystring = require('querystring')
const {get, set} = require('./src/db/redis')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')

/**
 * 获取过期时间
 */
const getCookieExpires = () => {
  const d = new Date()
  d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
  return d.toGMTString()
}

/**
 * 用于处理postData
 * @param req request获取postData
 */
const getPostData = req => {
  return new Promise((resolve, reject) => {
    if (req.method !== 'POST') {
      resolve({})
      return
    }
    if (req.headers['content-type'] !== 'application/json') {
      resolve({})
      return
    }
    let data = []
    req.on('data', chunk => {
      data.push(chunk)
    })
    req.on('end', () => {
      let postData = Buffer.concat(data).toString()
      if (!postData) {
        resolve({})
        return
      }
      resolve(JSON.parse(postData))
    })
  })
}

const serverHandle = (req, res) => {
  // 设置返回格式
  res.setHeader('Content-type', 'application/json')
  // 获取path
  const url = req.url
  req.path = url.split('?')[0]
  // 解析query
  req.query = querystring.parse(url.split('?')[1])
  // 解析cookie
  req.cookie = {}
  const cookieStr = req.headers.cookie || ''
  cookieStr.split(';').forEach(item => {
    if (!item) {
      return
    }
    const arr = item.split('=')
    const key = arr[0].trim()
    req.cookie[key] = arr[1]
  })

  // 使用redis解析session
  let needSetCookie = false
  let userId = req.cookie.userid
  if (!userId) {
    needSetCookie = true
    userId = `${Date.now()}_${Math.random()}`
    // 初始化redis中的session
    set(userId, {})
  }
  // 获取session
  req.sessionId = userId
  get(userId).then(sessionData => {
    if (sessionData == null) {
      // 初始化redis中的session
      set(req.sessionId, {})
      // 设置 session
      req.session = {}
    } else {
      req.session = sessionData
    }
    console.log(req.session)
    return getPostData(req) // 处理postData
  })
    .then(postData => {
      req.body = postData
      // 处理blog路由
      const blogResult = handleBlogRouter(req, res)
      if (blogResult) {
        blogResult.then(blogData => {
          if (needSetCookie) {
            // 设置cookie
            res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
          }
          res.end(JSON.stringify(blogData))
        })
        return
      }
      // 处理user路由
      const userResult = handleUserRouter(req, res)
      if (userResult) {
        userResult.then(userData => {
          if (needSetCookie) {
            // 设置cookie
            res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
          }
          res.end(JSON.stringify(userData))
        })
        return
      }
      // 未命中路由
      res.writeHead(404, {"Content-type": "text/plain"})
      res.write("404 not found")
      res.end()
    })
}

module.exports = serverHandle

// process.env.NODE_ENV
