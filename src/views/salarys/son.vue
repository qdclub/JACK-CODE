<template>
  <div>
    子组件 - son.vue
    <br>
    count 值为: {{ value }}
    <br>
    <el-button size="mini" @click="hClick">点我给 count + 1</el-button>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  methods: {
    hClick() {
      // this.value++
      this.$emit('input', this.value + 1)
    }
  }
}
</script>
