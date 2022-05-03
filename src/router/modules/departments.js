import Layout from '@/layout'

// 需求: 访问 /departments 时, 将组件渲染在 Layout 的 AppMain 组件内

export default {
  path: '/departments',
  component: Layout,
  children: [
    { // 默认路由: 将子路由的 path 设置为 '' 字符串
      // 如果子路由的 path 设置为空字符串表示该路由的默认路由
      path: '', // /departments/edit
      name: 'Departments',
      component: () => import('@/views/departments/departments.vue'),
      meta: { title: '组织架构', icon: 'tree' }
    }
  ]
}
