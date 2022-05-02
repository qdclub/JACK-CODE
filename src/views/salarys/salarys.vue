<template>
  <div class="salarys-container">
    <div class="app-container">
      <el-card>
        <!-- 具体页面结构 -->
        工资
        <hr>
        <son :value="count" @input="val => count = val" />
        <!-- v-model 双向绑定指令就是一个语法糖, 本质上做了两件事情 -->
        <!-- 1. 给子组件绑定一个 value 属性, 对应一个变量 -->
        <!-- 2. 给子组件绑定一个 input 事件, 在事件处理函数中给变量赋值 -->
        <son v-model="count2" />
        <!-- .sync 修饰符 -->
        <!-- 由于 v-model 只能在组件或标签上设置一次, 如果需要有多个变量双向绑定, 就无法很好的实现 -->
        <!-- 原理: 和 v-model 极其类似 -->
        <!-- 区别:
          1. v-model 在标签上只能绑定 1 个
          2. v-model 用的事件名 input, 属性名是 value, .sync 用的事件名 update:属性名, 属性名自定义
         -->
        <sonSync :count="count" @update:count="val => count = val" />
        <sonSync :count.sync="count" />
      </el-card>
    </div>
  </div>
</template>

<script>
import son from './son.vue'
import sonSync from './sonSync.vue'
export default {
  components: {
    son,
    sonSync
  },
  data() {
    return {
      count: 0,
      count2: 0
    }
  }
}
</script>
