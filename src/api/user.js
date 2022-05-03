import request from '@/utils/request'

// 接口封装

/**
 * 登录 API
 * @param {Object} data 登录表单
 * @returns 登录结果, promise 对象
 */
export function login(data) {
  return request({
    url: '/sys/login',
    method: 'POST',
    data
  })
}

/**
 * 获取用户信息 API
 * @returns 用户信息
 */
export function getProfile() {
  return request({
    url: '/sys/profile',
    method: 'POST'
  })
}

/**
 * 获取用户基本信息 API
 * @returns 用户信息
 */
export function getUserDetailById(id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'GET'
  })
}
