<template>
  <div>
    <el-form ref="deptForm" label-width="120px">
      <el-form-item label="部门名称">
        <el-input v-model="form.name" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门编码">
        <el-input v-model="form.code" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门负责人">
        <el-select v-model="form.manager" style="width:80%" placeholder="请选择">
          <!-- value 值是为了提交给后台的, 所以需要看后台要什么, 咱们传什么 -->
          <el-option v-for="item in employees" :key="item.id" :value="item.username" :label="item.username" />
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍">
        <el-input v-model="form.introduce" style="width:80%" placeholder="1-300个字符" type="textarea" :rows="3" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" @click="hSubmit">确定</el-button>
        <el-button size="small" @click="hCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getEmployeeSimple } from '@/api/employees'
import {
  addDepartment,
  getDepartmentById,
  updateDepartment
} from '@/api/departments'

export default {
  name: 'AddOrEdit',
  props: {
    id: {
      type: String,
      required: true
    },
    isEdit: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      form: {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '' // 部门介绍
      },
      employees: []
    }
  },
  created() {
    // 不论添加还是编辑都要发送
    this.loadEmployees()
    // 只在编辑部门时发送
    this.loadDepartment()
  },
  methods: {
    // 当用户点击确定时触发
    hSubmit() {
      // 根据当前的状态来决定添加还是编辑
      if (this.isEdit) {
        // 做编辑的逻辑
        this.doEdit()
      } else {
        // 做添加的逻辑
        this.doAdd()
      }
    },
    async doEdit() {
      try {
        // 1. 兜底校验 (暂时不做)
        // 2. 发请求拿结果
        const res = await updateDepartment(this.form)

        // 3. 根据结果提醒用户
        this.$message.success(res.message)

        // 4. 关闭 dialog
        // 5. 通知父组件更新
        this.$emit('success')
      } catch (e) {
        this.$message.error(e.message)
      }
    },
    async doAdd() {
      try {
        // 用户点击了确定
        // 1. 兜底校验 (暂时不做)
        // 2. 发请求拿结果
        // this.form.pid = this.id
        const res = await addDepartment({ ...this.form, pid: this.id })

        // console.log(res)
        // 3. 根据结果提醒用户
        this.$message.success(res.message)

        // 4. 关闭 dialog
        // 5. 通知父组件更新数据
        this.$emit('success')
      } catch (e) {
        this.$message.error(e.message)
      }
    },
    hCancel() {},
    async loadEmployees() {
      const res = await getEmployeeSimple()
      // console.log(res)
      this.employees = res.data
    },
    async loadDepartment() {
      // 组件加载时判断是否为编辑, 决定是否发请求
      // 判断当前到底是添加还是编辑
      if (!this.isEdit) return

      try {
        // 发请求获取部门详情
        const res = await getDepartmentById(this.id)
        // console.log(res)
        // 数据回填
        this.form = res.data
      } catch (e) {
        console.log('获取部门详情失败, 原因是:', e)
      }
    }
  }
}
</script>
