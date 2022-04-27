// 导出假数据
module.exports = [
  {
    // 请求的接口地址
    url: '/news/getList',
    type: 'get',
    response: config => {
      return {
        success: true,
        code: 0,
        message: '获取新闻列表成功!',
        data: [
          { id: 0, title: '震惊! 学校解封了! 据说以下几处地方都被封堵...', date: new Date() },
          { id: 1, title: '震惊! 今日疫情情况...', date: new Date() },
          { id: 2, title: '震惊! 想减肥吃这个...', date: new Date() },
          { id: 3, title: '震惊! 俄乌战争进入这个阶段...', date: new Date() }
        ]
      }
    }
  }
]
