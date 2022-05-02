<template>
  <div>
    子组件 - sonSync.vue
    <br>
    count 值为: {{ count }}
    <br>
    <el-button size="mini" @click="hClick">点我给 count + 1</el-button>
  </div>
</template>

<script>
export default {
  props: {
    count: {
      type: Number,
      required: true
    }
  },
  methods: {
    hClick() {
      // this.count++
      this.$emit('update:count', this.count + 1)
    }
  }
}
</script>
