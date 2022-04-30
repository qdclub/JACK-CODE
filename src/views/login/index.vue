<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">
          <img src="@/assets/common/login-logo.png" alt="">
        </h3>
      </div>

      <el-form-item prop="mobile">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <!--
          表单校验的三个步骤:
          1. 定义规则
          2. 应用规则(三要素)
            a. el-form 的 model
            b. el-form 的 rules
            c. el-form-item 的 prop
          3. 兜底校验

         -->
        <el-input
          ref="mobile"
          v-model="loginForm.mobile"
          placeholder="请输入手机号"
          name="mobile"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="请输入密码"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <el-button class="loginBtn" :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">登录</el-button>

      <!-- <el-button @click="getUserProfile">获取用户信息</el-button> -->

      <div class="tips">
        <span style="margin-right:20px;">账号: 13800000002</span>
        <span> 密码: 123456</span>
      </div>

    </el-form>
  </div>
</template>

<script>
import { validMobile } from '@/utils/validate'
// import { getProfile } from '@/api/user'

export default {
  name: 'Login',
  data() {
    // value: 校验的数据项的值
    // callback: 回调函数, 直接调用不传参表示通过, 传入 error 对象表示不通过, 并设置错误消息
    const validateMobile = (rule, value, callback) => {
      if (!validMobile(value)) {
        callback(new Error('请输入正确格式的手机号'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        mobile: '13800000002',
        password: '123456'
      },
      loginRules: {
        mobile: [
          // required: true 必填项
          // trigger: 触发时机(事件)
          // validator: 自定义校验规则, 函数
          // message: 错误提示消息
          // pattern: 定义正则, 真正项目开发时其实用的比较少, 因为复用性不高
          { required: true, trigger: 'blur', message: '请输入手机号' },
          { trigger: 'blur', validator: validateMobile }
        ],
        password: [
          { required: true, trigger: 'blur', message: '请输入密码' },
          { min: 6, max: 16, trigger: 'blur', message: '请输入 6 ~ 16 位的密码' }
        ]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      // 兜底校验
      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          // login(this.loginForm).then().catch()
          // this.$http() 这个代码封装到 login 函数中了

          // 改造前: 在组件内发请求, 调用 mutations 操作 state
          // try 代码块包裹「可能」会出错的代码
          // 网络请求就是可能正确也有可能错误
          // try {
          //   const res = await login(this.loginForm)
          //   // console.log(res)
          //   // 调用 mutations 将 token 存入 vuex
          //   this.$store.commit('user/updateToken', res.data)
          //   // 如果没有拦截器, 还需要在此处判断 success
          //   // if (res.code !== 0) // 大事件
          //   // if (!res.success) // 人资
          // } catch (e) {
          //   // console.dir(e)
          //   this.$message.error(e.message)
          // }

          // 改造后: 在 actions 发请求, 组件内只需要调用 actions 即可
          // 如果需要捕获到异常, 要在 dispatch 前加 await 等待请求完成
          try {
            // 一定要记得加 await 否则会出现登录失败但依然跳转到首页的意外情况
            await this.$store.dispatch('user/postLogin', this.loginForm)
            // 跳转到首页
            // this.$message.success('登录成功')
            this.$router.push('/')
          } catch (e) {
            this.$message.error(e.message)
          }
        }
      })
    }
    // async getUserProfile() {
    //   console.log('我要获取用户信息')
    //   const res = await getProfile()
    //   console.log(res)
    // }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#68b0fe;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  // @ 表示 src
  // 但是 @ 符合只能在 script 和 template 标签中使用
  // 在 style 中无法使用
  // 在 style 中需要在 @ 符号前面加一个 ~
  background-image: url('~@/assets/common/login.jpg'); // 设置背景图片
  background-position: center; // 将图片位置设置为充满整个屏幕
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.7); // 输入登录表单的背景色
    border-radius: 5px;
    color: #454545;
  }

  .loginBtn {
    background: #407ffe;
    height: 64px;
    line-height: 32px;
    font-size: 24px;
  }

  /* reset element-ui css */
  .el-form-item__error {
    color: #fff
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
