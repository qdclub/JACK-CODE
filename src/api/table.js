import request from '@/utils/request'

// 单行注释
/* 多行注释 */
/** 文档注释 */

/**
 * 这是获取表格数据的 API
 * @param {*} params 请求参数
 * @returns 一个 promise 对象
 */
export function getList(params) {
  return request({
    url: '/vue-admin-template/table/list',
    method: 'get',
    params
  })
}
