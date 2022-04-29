/**
 * Created by ltc by 2022/04/29
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

// /**
//  * @param {string} str
//  * @returns {Boolean}
//  */
// export function validUsername(str) {
//   const valid_map = ['admin', 'editor']
//   return valid_map.indexOf(str.trim()) >= 0
// }

/**
 * 手机号正则校验
 * @param {string} str 手机号
 * @returns 校验结果
 */
export function validMobile(str) {
  // return 布尔值, 手机号的校验结果
  return /^1[3-9]\d{9}$/.test(str)
}
