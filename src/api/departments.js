import request from '@/utils/request'

/**
 * 获取部门列表
 * @returns 部门列表
 */
export function getDepartments() {
  return request({
    url: '/company/department',
    method: 'GET'
  })
}

/**
 * 添加部门
 * @returns 添加的结果
 */
export function addDepartment(data) {
  return request({
    url: '/company/department',
    method: 'POST',
    data
  })
}

/**
 * 根据 ID 查询部门详情
 * @returns 部门详情
 */
export function getDepartmentById(id) {
  return request({
    url: '/company/department/' + id,
    method: 'GET'
  })
}

/**
 * 根据 ID 查询部门详情
 * @returns 部门详情
 */
export function updateDepartment(data) {
  return request({
    url: '/company/department/' + data.id,
    method: 'PUT',
    data
  })
}
