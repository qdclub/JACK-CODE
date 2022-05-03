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
import { addDepartment } from '@/api/departments'

export default {
  name: 'AddOrEdit',
  props: {
    id: {
      type: String,
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
    this.loadEmployees()
  },
  methods: {
    async hSubmit() {
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
    }
  }
}
</script>
