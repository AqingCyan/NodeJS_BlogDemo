/**
 * 获取博客列表
 * @param author 作者
 * @param keyword 关键字
 * @returns {*[]}
 */
const getList = (author, keyword) => {
  // 先返回假数据，格式正确
  return [
    {
      id: 1,
      title: '标题A',
      content: '内容A',
      createTime: 1557058226130,
      author: 'Aqing'
    },
    {
      id: 2,
      title: '标题B',
      content: '内容B',
      createTime: 1557058267960,
      author: 'Cyan'
    }
  ]
}

/**
 * 获取一篇博客详情
 * @param id：查询博客的id号
 * @returns {{createTime: number, author: string, id: number, title: string, content: string}}
 */
const getDetail = id => {
  // 先返回假数据
  return {
    id: 1,
    title: '标题A',
    content: '内容A',
    createTime: 1557058226130,
    author: 'Aqing'
  }
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
