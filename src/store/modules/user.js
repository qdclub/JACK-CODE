import { setToken, getToken, removeToken } from '@/utils/auth'
import { login, getProfile, getUserDetailById } from '@/api/user'
import { Message } from 'element-ui'
// import { Message } from 'element-ui'

export default {
  namespaced: true,
  state: {
    // 首次加载在 Cookies 中取值
    token: getToken() || '',
    userInfo: {}
  },
  mutations: {
    // 定义 mutations 来操作 token
    updateToken(state, token) {
      state.token = token
      // 存到本地 Cookies 中
      setToken(token)
    },
    // 删除 token
    removeToken(state) {
      state.token = ''
      // 删除 Cookies 中的 token
      removeToken()
    },
    updateUserInfo(state, userInfo) {
      state.userInfo = userInfo
    }
  },
  actions: {
    async postLogin(context, loginForm) {
      // try {
      // 发请求登录
      const res = await login(loginForm)
      // 将 token 交给 mutations 存入 state
      context.commit('updateToken', res.data)
      Message.success(res.message)
      // } catch (e) {
      //   Message.error(e.message)
      // }
    },
    async postProfile(context) {
      const res1 = await getProfile()
      const res2 = await getUserDetailById(res1.data.userId)
      // console.log(res1, res2)
      context.commit('updateUserInfo', { ...res1.data, ...res2.data })
    }
  }
}

// import { login, logout, getInfo } from '@/api/user'
// import { getToken, setToken, removeToken } from '@/utils/auth'
// import { resetRouter } from '@/router'

// const getDefaultState = () => {
//   return {
//     token: getToken(),
//     name: '',
//     avatar: ''
//   }
// }

// const state = getDefaultState()

// const mutations = {
//   RESET_STATE: (state) => {
//     Object.assign(state, getDefaultState())
//   },
//   SET_TOKEN: (state, token) => {
//     state.token = token
//   },
//   SET_NAME: (state, name) => {
//     state.name = name
//   },
//   SET_AVATAR: (state, avatar) => {
//     state.avatar = avatar
//   }
// }

// const actions = {
//   // user login
//   login({ commit }, userInfo) {
//     const { username, password } = userInfo
//     return new Promise((resolve, reject) => {
//       login({ username: username.trim(), password: password }).then(response => {
//         const { data } = response
//         commit('SET_TOKEN', data.token)
//         setToken(data.token)
//         resolve()
//       }).catch(error => {
//         reject(error)
//       })
//     })
//   },

//   // get user info
//   getInfo({ commit, state }) {
//     return new Promise((resolve, reject) => {
//       getInfo(state.token).then(response => {
//         const { data } = response

//         if (!data) {
//           return reject('Verification failed, please Login again.')
//         }

//         const { name, avatar } = data

//         commit('SET_NAME', name)
//         commit('SET_AVATAR', avatar)
//         resolve(data)
//       }).catch(error => {
//         reject(error)
//       })
//     })
//   },

//   // user logout
//   logout({ commit, state }) {
//     return new Promise((resolve, reject) => {
//       logout(state.token).then(() => {
//         removeToken() // must remove  token  first
//         resetRouter()
//         commit('RESET_STATE')
//         resolve()
//       }).catch(error => {
//         reject(error)
//       })
//     })
//   },

//   // remove token
//   resetToken({ commit }) {
//     return new Promise(resolve => {
//       removeToken() // must remove  token  first
//       commit('RESET_STATE')
//       resolve()
//     })
//   }
// }

// export default {
//   namespaced: true,
//   state,
//   mutations,
//   actions
// }

