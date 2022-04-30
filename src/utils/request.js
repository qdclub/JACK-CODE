import axios from 'axios'
import store from '@/store'
import router from '@/router'

const service = axios.create({
  // 当没有设置服务器地址时, 请求的就是当前服务器
  // http://localhost:9528/api 是绝对路径
  // /api 就是相对当前服务器的路径
  // baseURL: '/api',
  baseURL: process.env.VUE_APP_BASE_API,
  // baseURL: 'http://ihrm-java.itheima.net',
  // 请求超时的等待时间
  timeout: 1000 // request timeout
})

// 添加请求拦截器
service.interceptors.request.use(function(config) {
  // 在发送请求之前做些什么
  // 将 vuex 中的 token 携带到请求头中
  // 获取 Vuex 中的 token
  const token = store.state.user.token
  // Authorization
  // 先判断是否有 token, 如果有就携带
  // 注意 Bearer 和 token 之间的空格
  if (token) {
    // 对象的两种访问属性的方法
    // [] 里面可以写变量
    // config.headers['Authorization']
    config.headers.Authorization = 'Bearer ' + token
  }
  return config
}, function(error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
service.interceptors.response.use(function(response) {
  console.log('响应结果拦截到了:', response)
  if (response.data.success) {
    // 数据脱壳
    return response.data
  } else {
    // 对响应数据做点什么
    // 服务器响应错误的时候, 但此时 axios 不会报错
    // 手动报错!
    // axios 基于 promise 封装
    // 作用: 抛出错误!
    return Promise.reject(new Error(response.data.message))
  }
}, function(error) {
  // console.log('响应错误拦截到了:', error)
  console.dir(error)
  console.log('router:', router)
  // router.currentRoute: 获取当前的路由信息, 完全等同于 $route
  if (error.response.data.code === 10002) {
    // token 失效
    // 清空 token 和 userInfo
    store.dispatch('user/logout')
    // 跳转到登录页
    // 当前在什么页面, 登录后还得跳回来
    router.push({
      path: '/login',
      query: {
        return_url: router.currentRoute.fullPath // 路由会帮咱们转码, 无需手动处理
      }
    })
  }
  // 对响应错误做点什么
  return Promise.reject(error)
})

export default service

// import axios from 'axios'
// import { MessageBox, Message } from 'element-ui'
// import store from '@/store'
// import { getToken } from '@/utils/auth'

// // 创建一个 axios 实例对象
// // 传入配置对象
// const service = axios.create({
//   // 基地址
//   baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
//   // withCredentials: true, // send cookies when cross-domain requests
//   // 请求超时的等待时间
//   timeout: 5000 // request timeout
// })

// // request interceptor
// service.interceptors.request.use(
//   config => {
//     // do something before request is sent

//     if (store.getters.token) {
//       // let each request carry token
//       // ['X-Token'] is a custom headers key
//       // please modify it according to the actual situation
//       config.headers['X-Token'] = getToken()
//     }
//     return config
//   },
//   error => {
//     // do something with request error
//     console.log(error) // for debug
//     return Promise.reject(error)
//   }
// )

// // response interceptor
// service.interceptors.response.use(
//   /**
//    * If you want to get http information such as headers or status
//    * Please return  response => response
//   */

//   /**
//    * Determine the request status by custom code
//    * Here is just an example
//    * You can also judge the status by HTTP Status Code
//    */
//   response => {
//     const res = response.data

//     // if the custom code is not 20000, it is judged as an error.
//     if (res.code !== 20000) {
//       Message({
//         message: res.message || 'Error',
//         type: 'error',
//         duration: 5 * 1000
//       })

//       // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
//       if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
//         // to re-login
//         MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
//           confirmButtonText: 'Re-Login',
//           cancelButtonText: 'Cancel',
//           type: 'warning'
//         }).then(() => {
//           store.dispatch('user/resetToken').then(() => {
//             location.reload()
//           })
//         })
//       }
//       return Promise.reject(new Error(res.message || 'Error'))
//     } else {
//       return res
//     }
//   },
//   error => {
//     console.log('err' + error) // for debug
//     Message({
//       message: error.message,
//       type: 'error',
//       duration: 5 * 1000
//     })
//     return Promise.reject(error)
//   }
// )

// export default service
