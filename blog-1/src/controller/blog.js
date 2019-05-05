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

module.exports = {
  getList,
  getDetail
}
