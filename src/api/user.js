import request from '@/utils/request'

// 接口封装

/**
 * 登录 API
 * @param {Object} data 登录表单
 * @returns 登录结果, promise 对象
 */
export function login(data) {
  return request({
    url: '/api/sys/login',
    method: 'POST',
    data
  })
}

export function getInfo(token) {
}

export function logout() {
}
