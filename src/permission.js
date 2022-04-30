import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

// 定义白名单数组
const whiteList = ['/login', '/404']

// 注册全局前置守卫
// 参数1: 到哪里去
// 参数2: 从哪里来
// 参数3: 是否放行的回调函数
// 注意事项: 导航守卫一定要调用 next
router.beforeEach((to, from, next) => {
  NProgress.start()
  // token 存在 vuex 中, 所以需要导入 store, 取 token
  const token = store.state.user.token
  // console.log(token)
  // 权限控制兵分两路:
  // 1. 有 token 的情况
  //    判断是否去登录页, 如果是就强行跳转到首页, 如果不是就放行
  // 2. 无 token 的情况
  //    判断是否去登录页, 如果是就放行, 如果不是就强行跳转到登录页
  if (token) {
    // 已登录, 页面跳转前发请求获取用户信息
    // TODO: 需要加 await 暂时不加, 留做演示
    store.dispatch('user/postProfile')

    if (to.path === '/login') {
      // console.log('您已经登陆了, 就别去登录页了, 强行给你跳到首页')
      next('/')
      // 如果已经登录了, 从首页访问登录页, 则不会进行路由跳转, 从首页到首页不算路由跳转
      // 会导致后置守卫不触发的情况
      NProgress.done()
    } else {
      next()
    }
  } else {
    // 当未登录时, 要判断是否去白名单页面
    // 白名单: 未登录时也可以访问的页面, 例如 登录 注册 404
    // 如果用逻辑或来写, 将来可维护性不高
    // if (to.path === '/login' || to.path === '/404') {
    // if (whiteList.indexOf(to.path) > -1) { // 不好用, 还要记返回值
    // whiteList.includes: 判断指定的值是否在数组中, 返回值是 boolean
    if (whiteList.includes(to.path)) {
      // 判断要去的页面在不在白名单, 如果在就放行
      next()
    } else {
      // console.log('您未登录, 就别到处溜达了, 强行给你跳到登录页')
      next('/login')
      NProgress.done()
    }
  }
})

// 注册全局后置守卫
// 在路由跳转后触发
router.afterEach(() => {
  // console.log('我是后置守卫, 您已经跳转路由了')
  NProgress.done()
})

// import { Message } from 'element-ui'
// import { getToken } from '@/utils/auth' // get token from cookie
// import getPageTitle from '@/utils/get-page-title'

// NProgress.configure({ showSpinner: false }) // NProgress Configuration

// const whiteList = ['/login'] // no redirect whitelist

// router.beforeEach(async(to, from, next) => {
//   // start progress bar
//   NProgress.start()

//   // set page title
//   document.title = getPageTitle(to.meta.title)

//   // determine whether the user has logged in
//   const hasToken = getToken()

//   if (hasToken) {
//     if (to.path === '/login') {
//       // if is logged in, redirect to the home page
//       next({ path: '/' })
//       NProgress.done()
//     } else {
//       const hasGetUserInfo = store.getters.name
//       if (hasGetUserInfo) {
//         next()
//       } else {
//         try {
//           // get user info
//           await store.dispatch('user/getInfo')

//           next()
//         } catch (error) {
//           // remove token and go to login page to re-login
//           await store.dispatch('user/resetToken')
//           Message.error(error || 'Has Error')
//           next(`/login?redirect=${to.path}`)
//           NProgress.done()
//         }
//       }
//     }
//   } else {
//     /* has no token*/

//     if (whiteList.indexOf(to.path) !== -1) {
//       // in the free login whitelist, go directly
//       next()
//     } else {
//       // other pages that do not have permission to access are redirected to the login page.
//       next(`/login?redirect=${to.path}`)
//       NProgress.done()
//     }
//   }
// })

// router.afterEach(() => {
//   // finish progress bar
//   NProgress.done()
// })
