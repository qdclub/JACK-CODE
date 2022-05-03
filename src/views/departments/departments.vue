<template>
  <div class="department-container">
    <div class="app-container">
      <el-card>
        <!-- 用一个行列布局 -->
        <!-- el-row / el-col 属于布局容器 -->
        <el-row type="flex" justify="space-between" align="middle" style="height: 40px">
          <el-col :span="20">
            <svg-icon icon-class="bank" /><span>江苏传智播客教育科技股份有限公司</span>
          </el-col>
          <el-col :span="4">
            <el-row type="flex" justify="end">
              <!-- 两个内容 -->
              <el-col>负责人</el-col>
              <!-- 下拉菜单 element -->
              <el-col>
                <el-dropdown>
                  <span>
                    操作<i class="el-icon-arrow-down" />
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>添加子部门</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-col>
            </el-row>
          </el-col>
        </el-row>

        <!-- 树形组件 -->
        <!-- default-expand-all: 默认展开所有子节点 -->
        <el-tree default-expand-all :data="list">
          <template v-slot="{ data }">
            <el-row type="flex" justify="space-between" align="middle" style="height: 40px;width: 100%">
              <el-col :span="20">
                <span>{{ data.name }}</span>
              </el-col>
              <el-col :span="4">
                <el-row type="flex" justify="end">
                  <!-- 两个内容 -->
                  <el-col>{{ data.manager }}</el-col>
                  <!-- 下拉菜单 element -->
                  <el-col>
                    <el-dropdown>
                      <span>
                        操作<i class="el-icon-arrow-down" />
                      </span>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item @click.native="hAddOrEdit(data.id, false)">添加子部门</el-dropdown-item>
                        <el-dropdown-item @click.native="hAddOrEdit(data.id, true)">编辑部门</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-tree>
      </el-card>
    </div>
    <el-dialog
      title="添加或编辑"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :visible.sync="showDialog"
    >
      <!--
        烤串命名法: 常用于标签属性  Kebab-Case
        驼峰命名法: 常用于变量      Camel-Case
        这两种命名方式在组件使用 / Props 传值时可以互相替代使用
       -->
      <add-or-edit :id="curId" :is-edit="isEdit" @success="hSuccess" />
    </el-dialog>
  </div>
</template>

<script>
import { getDepartments } from '@/api/departments'
import { tranListToTreeData } from '@/utils'
import AddOrEdit from './deptDialog.vue'

export default {
  // created() {
  //   // 路由信息对象, 存储 path / query / params
  //   console.log(this.$route.meta.title)
  // }

  components: {
    AddOrEdit
  },

  data() {
    return {
      list: [],
      showDialog: false,
      curId: '', // 当前被点击的部门 id
      isEdit: ''
      // list: [{
      //   name: '财务部',
      //   manager: '刘备',
      //   children: [
      //     {
      //       name: '财务核算部',
      //       manager: '张飞'
      //     },
      //     {
      //       name: '税务核算部',
      //       manager: '关羽'
      //     }
      //   ]
      // }]
      // list: [
      //   {
      //     label: '财务部',
      //     children: [
      //       {
      //         label: '财务核算部'
      //       },
      //       {
      //         label: '税务管理部'
      //       },
      //       {
      //         label: '薪资管理部'
      //       }
      //     ]
      //   }
      // ]
      // defaultProps: {
      //   children: 'children',
      //   label: 'name'
      // }
    }
  },
  created() {
    this.loadDepartments()
  },
  methods: {
    // 1. 封装函数
    async loadDepartments() {
      // 2. try-catch 为了捕获异常, 减少网页中错误的出现
      try {
        const res = await getDepartments()
        // console.log(res)
        // 任务: 复习数组的常用 API
        // shift: 删除数组的第一个元素, 返回删除的元素
        // pop: 删除数组的最后一个元素
        // push: 从末尾添加一个元素
        // unshift: 从开头添加一个元素
        // 四个方法都会直接修改原数组

        // 3. 删除获取到的数据中第一个元素 (传智教育)
        res.data.depts.shift()
        this.list = tranListToTreeData(res.data.depts)

        // this.list = res.data.depts.shift()
      } catch (e) {
        console.log('获取组织架构失败, 原因:', e)
      }
    },
    hAddOrEdit(id, isEdit) {
      // 显示 dialog
      this.showDialog = true

      // 将当前点击的部门 id 传给子组件
      // console.log(id)
      this.curId = id

      // 当前在添加的逻辑
      this.isEdit = isEdit
    },
    // hAdd(id) {
    //   // 显示 dialog
    //   this.showDialog = true

    //   // 将当前点击的部门 id 传给子组件
    //   // console.log(id)
    //   this.curId = id

    //   // 当前在添加的逻辑
    //   this.isEdit = false
    // },
    // hEdit(id) {
    //   // 显示 dialog
    //   this.showDialog = true
    //   // 将当前点击的部门 id 传给子组件
    //   // console.log(id)
    //   this.curId = id

    //   // 当前在编辑的逻辑
    //   this.isEdit = true
    // },
    hSuccess() {
      // 收到子组件通知的成功, 报喜
      // 关闭 dialog
      this.showDialog = false

      // 获取最新的数据
      this.loadDepartments()
    }
  }
}
</script>
