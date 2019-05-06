const {exec} = require('../db/mysql')
/**
 * 获取博客列表
 * @param author 作者
 * @param keyword 关键字
 */
const getList = (author, keyword) => {
  let sql = `select * from blogs where 1=1 `
  if (author) {
    sql += `and author='${author}' `
  }
  if (keyword) {
    sql += `and title like '%${keyword}%' `
  }
  sql += `order by createtime desc;`
  return exec(sql)
}

/**
 * 获取一篇博客详情
 * @param id：查询博客的id号
 */
const getDetail = id => {
  const sql = `select * from blogs where id='${id}'`
  return exec(sql).then(rows => {
    return rows[0] // 这里的查询结果是一个数组
  })
}

/**
 * 创建博客业务
 * @param blogData：一个博客对象，包含title content属性
 */
const newBlog = (blogData = {}) => {
  console.log('newBlog blogData: ', blogData)
  return {
    id: 3 // 标签新建博客插入到数据表里面的id
  }
}

/**
 * 更新博客业务
 * @param id 更新博客的id
 * @param blogData 更新的内容
 * @returns {boolean}
 */
const updateBlog = (id, blogData = {}) => {
  console.log('update blogData: ', id, blogData)
  return true
}

/**
 * 删除一篇博客
 * @param id 要删除的博客id
 */
const delBolg = id => {
  return true
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBolg
}
