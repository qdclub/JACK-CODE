<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <!-- 项目中无需使用面包屑 -->
    <!-- <breadcrumb class="breadcrumb-container" /> -->

    <div class="app-breadcrumb">
      江苏传智播客教育科技股份有限公司
      <span class="breadBtn">体验版</span>
    </div>

    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <!-- <img :src="$store.state.user.userInfo.staffPhoto" class="user-avatar"> -->
          <!-- $store.getters.staffPhoto -->
          <img :src="staffPhoto" class="user-avatar">
          <!-- <span class="name">{{ $store.state.user.userInfo.username }}</span> -->
          <!-- userInfo.username -->
          <!-- $store.getters.username -->
          <span class="name">{{ username }}</span>
          <i class="el-icon-caret-bottom" style="color:#fff" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item>
              首页
            </el-dropdown-item>
          </router-link>
          <a target="_blank" href="https://gitee.com/leetc/vue-hrsaas-73">
            <el-dropdown-item>项目地址</el-dropdown-item>
          </a>
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'

export default {
  components: {
    // Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'username',
      'staffPhoto'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    logout() {
      // console.log('我是 logout')
      this.$confirm('确定退出吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          // 用户点了确定
          // 变相的说明了, actions 不仅仅只能做异步操作, 同样也可以做同步操作, 可以将 actions 理解为一个函数封装而已
          // 清空 token 和 userInfo
          this.$store.dispatch('user/logout')
          // 以下 2 行操作完全等同于上面一行的操作, 上面就是将代码放到 actions 函数中调用而已
          // this.$store.commit('user/removeToken')
          // this.$store.commit('user/removeUserInfo')

          // 跳转至登录页
          // fullPath 和 path 的区别
          // fullPath 包括查询参数
          // path 不包括查询参数
          // console.log(this.$route.fullPath)
          // 由于浏览器的 URL 的参数中不可以有中文和特殊符号( / & : ), 所以需要人工转码
          // encodeURI : 可以转码中文, 但不能转码符号
          // encodeURIComponent: 所有特殊字符都可以转码
          // this.$router.push(`/login?return_url=${encodeURIComponent(this.$route.fullPath)}`)
          // path + query
          // path 会忽略 params, 所以必须使用 query 传参
          this.$router.push({
            path: '/login',
            query: {
              return_url: this.$route.fullPath // 路由会帮咱们转码, 无需手动处理
            }
          })

          // 提醒用户退出成功
          this.$message.success('退出成功')

          // this.$router.push(`/login?redirect=${this.$route.fullPath}`)
        })
        .catch(e => {})
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background-image: -webkit-linear-gradient(left, #3d6df8, #5b8cff);
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .app-breadcrumb {
    display: inline-block;
    font-size: 18px;
    line-height: 50px;
    margin-left: 10px;
    color: #ffffff;
    cursor: text;
    .breadBtn {
      background: #84a9fe;
      font-size: 14px;
      padding: 0 10px;
      display: inline-block;
      height: 30px;
      line-height: 30px;
      border-radius: 10px;
      margin-left: 15px;
    }
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        // margin-top: 5px;
        position: relative;
        color: #fff;

        .user-avatar {
          cursor: pointer;
          width: 30px;
          height: 30px;
          border-radius: 15px;
          vertical-align: middle;
          margin-right: 8px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 18px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
