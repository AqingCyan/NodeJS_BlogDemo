const {SuccessModel, ErrorModel} = require('../model/resModel')
const {getList, getDetail, newBlog, updateBlog, delBolg} = require('../controller/blog')
const handleBlogRouter = (req, res) => {
  const method = req.method // GET or POST
  const id = req.query.id
  // 获取博客列表
  if (method === 'GET' && req.path === '/api/blog/list') {
    const author = req.query.author || ''
    const keyword = req.query.keyword || ''
    const result = getList(author, keyword) // 返回的是promise对象
    return result.then(listData => {
      return new SuccessModel(listData)
    })
  }
  // 获取博客详情
  if (method === 'GET' && req.path === '/api/blog/detail') {
    const result = getDetail(id)
    return result.then(data => {
      return new SuccessModel(data)
    })
  }
  // 新建一篇博客
  if (method === 'POST' && req.path === '/api/blog/new') {
    req.body.author = 'Aqing' // 未做登录，暂时用假数据
    const blogData = req.body
    const result = newBlog(blogData)
    return result.then(data => {
      return new SuccessModel(data)
    })
  }
  // 更新一遍博客
  if (method === 'POST' && req.path === '/api/blog/update') {
    const result = updateBlog(id, req.body)
    return result.then(val => {
      if (val) {
        return new SuccessModel('更新成功')
      } else {
        return new ErrorModel('更新失败')
      }
    })
  }
  // 删除一篇博客
  if (method === 'POST' && req.path === '/api/blog/del') {
    req.body.author = 'Aqing' // 未做登录，暂时用假数据
    const result = delBolg(id, req.body.author)
    return result.then(val => {
      if (val) {
        return new SuccessModel('删除成功')
      } else {
        return new ErrorModel('删除失败')
      }
    })
  }
}

module.exports = handleBlogRouter
