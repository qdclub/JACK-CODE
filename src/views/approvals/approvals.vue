<template>
  <div class="approvals-container">
    <div class="app-container">
      <el-card>
        <!-- 具体页面结构 -->
        审批管理
        <!-- <el-button></el-button> 内部触发了 click 事件 -->
        <!-- <el-dropdown-item></el-dropdown-item> 内部没有触发 click 事件 -->
        <!-- 给组件绑定事件, 需要子组件内部触发 -->
        <!-- 结论: 如果封装的组件, 是否可以绑定 click 事件, 得看子组件内部有没有触发 click 事件(原生事件) -->
        <!-- 如果子组件内部没有触发 click 事件, 可以在父组件上加 .native 修饰符, 其作用是将 click 绑定给子组件的根标签 -->
        <!-- 总结: 给组件绑定原生事件后, 如果没触发就加 .native -->
        <!-- 注意事项: 只有原生事件(click mouseenter mouseleave...)才需要加 .native -->
        <!-- naive 单纯的, native 本地的, 原生的 -->
        <son @click.native="sonClick" />
      </el-card>
    </div>
  </div>
</template>

<script>
import son from './son.vue'
export default {
  components: {
    son
  },
  methods: {
    sonClick() {
      console.log('son 被点了')
    }
  }
}
</script>
