import Layout from '@/layout'

export default {
  path: '/departments',
  component: Layout,
  children: [
    {
      // 如果子路由的 path 设置为空字符串表示该路由的默认路由
      path: '',
      name: 'Departments',
      component: () => import('@/views/departments/departments.vue'),
      meta: { title: '组织架构', icon: 'tree' }
    }
  ]
}
