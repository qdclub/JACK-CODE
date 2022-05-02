const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  // 当组件内访问全局的 getters => username 时, 就等于访问了 user 子模块中 userInfo.username
  // username(state) {
  //   // gettters 就是计算属性
  //   // 一定要返回一个结果
  //   return state.user.userInfo.username
  // },
  username: state => state.user.userInfo.username,
  staffPhoto: state => state.user.userInfo.staffPhoto,
  userId: state => state.user.userInfo.userId
}
export default getters
