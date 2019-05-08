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
 * @param blogData：一个博客对象，包含title content author属性
 */
const newBlog = (blogData = {}) => {
  const title = blogData.title
  const content = blogData.content
  const author = blogData.author
  const createtime = Date.now()

  const sql = `insert into blogs (title, content, createtime, author)
  values ('${title}', '${content}', ${createtime}, '${author}');`

  return exec(sql).then(insertData => {
    console.log(insertData)
    return {
      id: insertData.insertId
    }
  })
}

/**
 * 更新博客业务
 * @param id 更新博客的id
 * @param blogData 更新的内容
 */
const updateBlog = (id, blogData = {}) => {
  const title = blogData.title
  const content = blogData.content

  const sql = `update blogs set title='${title}', content='${content}' where id=${id}`
  return exec(sql).then(updateData => {
    return updateData.affectedRows > 0 // 说明修改成功
  })
}

/**
 * 删除一篇博客
 * @param id 要删除的博客id
 * @param author
 */
const delBolg = (id, author) => {
  const sql = `delete from blogs where id='${id}' and author='${author}'`
  return exec(sql).then(deleteData => {
    return deleteData.affectedRows > 0
  })
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBolg
}
