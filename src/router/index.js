import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'Home',
      component: () => import('@/views/home/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  }

  // {
  //   path: '/school',
  //   component: Layout,
  //   redirect: '/school/students',
  //   name: 'Example',
  //   meta: { title: '网校管理', icon: 'el-icon-s-help' },
  //   children: [
  //     {
  //       path: 'students',
  //       name: 'Students',
  //       component: () => import('@/views/school/student'),
  //       meta: { title: '网校学员', icon: 'table' }
  //     },
  //     {
  //       path: 'learning',
  //       name: 'Learning',
  //       component: () => import('@/views/school/learning'),
  //       meta: { title: '网校学习', icon: 'tree' }
  //     },
  //     {
  //       path: 'setting',
  //       name: 'Setting',
  //       component: () => import('@/views/school/setting'),
  //       meta: { title: '网校设置', icon: 'tree' }
  //     }
  //   ]
  // },

  // {
  //   path: '/shop-center',
  //   component: Layout,
  //   meta: { title: '商城中心', icon: 'form' },
  //   children: [
  //     {
  //       path: 'goods-manage',
  //       name: 'GoodsManage',
  //       component: () => import('@/views/shop/goods-manage'),
  //       meta: { title: '商品管理', icon: 'form' }
  //     },
  //     {
  //       path: 'virt-list',
  //       name: 'VirtList',
  //       component: () => import('@/views/shop/virt-list'),
  //       meta: { title: '虚拟列表', icon: 'form' }
  //     },
  //     {
  //       path: 'trade-stat',
  //       name: 'TradeStat',
  //       component: () => import('@/views/shop/trade-stat'),
  //       meta: { title: '交易统计', icon: 'form' }
  //     },
  //     {
  //       path: 'upload-big',
  //       name: 'UploadBigFile',
  //       component: () => import('@/views/shop/upload-big-file'),
  //       meta: { title: '上传大文件', icon: 'form' }
  //     }
  //   ]
  // },

  // {
  //   path: '/nested',
  //   component: Layout,
  //   redirect: '/nested/menu1',
  //   name: 'Nested',
  //   meta: {
  //     title: '招生中心',
  //     icon: 'nested'
  //   },
  //   children: [
  //     {
  //       path: 'menu1',
  //       component: () => import('@/views/nested/menu1/index'), // Parent router-view
  //       name: 'Menu1',
  //       meta: { title: '营销管理' },
  //       children: [
  //         {
  //           path: 'menu1-1',
  //           component: () => import('@/views/nested/menu1/menu1-1'),
  //           name: 'Menu1-1',
  //           meta: { title: '招生设置' }
  //         },
  //         {
  //           path: 'menu1-2',
  //           component: () => import('@/views/nested/menu1/menu1-2'),
  //           name: 'Menu1-2',
  //           meta: { title: '积分管理' },
  //           children: [
  //             {
  //               path: 'menu1-2-1',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
  //               name: 'Menu1-2-1',
  //               meta: { title: 'Menu1-2-1' }
  //             },
  //             {
  //               path: 'menu1-2-2',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
  //               name: 'Menu1-2-2',
  //               meta: { title: 'Menu1-2-2' }
  //             }
  //           ]
  //         },
  //         {
  //           path: 'menu1-3',
  //           component: () => import('@/views/nested/menu1/menu1-3'),
  //           name: 'Menu1-3',
  //           meta: { title: '直播推广' }
  //         },
  //         {
  //           path: 'menu1-4',
  //           component: () => import('@/views/nested/menu1/menu1-3'),
  //           name: 'Menu1-4',
  //           meta: { title: '课程推广' }
  //         },
  //         {
  //           path: 'menu1-5',
  //           component: () => import('@/views/nested/menu1/menu1-3'),
  //           name: 'Menu1-5',
  //           meta: { title: '资料下载' }
  //         }
  //       ]
  //     },
  //     {
  //       path: 'menu2',
  //       component: () => import('@/views/nested/menu2/index'),
  //       name: 'Menu2',
  //       meta: { title: '招生CRM' },
  //       children: [
  //         {
  //           path: 'menu2-1',
  //           component: () => import('@/views/nested/menu2/index'),
  //           name: 'menu2-1',
  //           meta: { title: '数据展示' }
  //         },
  //         {
  //           path: 'menu2-2',
  //           component: () => import('@/views/nested/menu2/index'),
  //           name: 'menu2-2',
  //           meta: { title: '意向学员管理' }
  //         },
  //         {
  //           path: 'menu2-3',
  //           component: () => import('@/views/nested/menu2/index'),
  //           name: 'menu2-3',
  //           meta: { title: '企业管理' }
  //         },
  //         {
  //           path: 'menu2-4',
  //           component: () => import('@/views/nested/menu2/index'),
  //           name: 'menu2-4',
  //           meta: { title: '跟进记录' }
  //         },
  //         {
  //           path: 'menu2-5',
  //           component: () => import('@/views/nested/menu2/index'),
  //           name: 'menu2-5',
  //           meta: { title: '访客计划' }
  //         },
  //         {
  //           path: 'menu2-6',
  //           component: () => import('@/views/nested/menu2/menu2-6/highSeas'),
  //           name: 'menu2-6',
  //           meta: { title: '意向学员公海池' }
  //         },
  //         {
  //           path: 'menu2-7',
  //           component: () => import('@/views/nested/menu2/index'),
  //           name: 'menu2-7',
  //           meta: { title: '企业公海池' }
  //         }
  //       ]
  //     },
  //     {
  //       path: 'menu3',
  //       component: () => import('@/views/nested/menu3/index'),
  //       name: 'Menu3',
  //       meta: { title: '信息采集' }
  //     }
  //   ]
  // },

  // {
  //   path: '/educational-center',
  //   component: Layout,
  //   meta: { title: '教务中心', icon: 'link' },
  //   children: [
  //     {
  //       path: 'student-status-manage',
  //       name: 'StudentStatus',
  //       component: () => import('@/views/educational/student-status'),
  //       meta: { title: '学籍管理', icon: 'link' }
  //     },
  //     {
  //       path: 'teaching-manage',
  //       name: 'Teaching',
  //       component: () => import('@/views/educational/teaching'),
  //       meta: { title: '教学管理', icon: 'link' }
  //     },
  //     {
  //       path: 'examination-manage',
  //       name: 'Examination',
  //       component: () => import('@/views/educational/examination'),
  //       meta: { title: '考务管理', icon: 'link' }
  //     }
  //   ]
  // },

  // {
  //   path: '/financial-center',
  //   name: 'Financial',
  //   component: Layout,
  //   meta: { title: '财务中心', icon: 'link' },
  //   children: [
  //     {
  //       path: 'paycost-manage',
  //       name: 'Paycost',
  //       component: () => import('@/views/financial/paycost'),
  //       meta: { title: '缴费管理', icon: 'link' }
  //     },
  //     {
  //       path: 'lackof-manage',
  //       name: 'Lackof',
  //       component: () => import('@/views/financial/lackof'),
  //       meta: { title: '欠费管理', icon: 'link' }
  //     },
  //     {
  //       path: 'they-deal',
  //       name: 'TheyDeal',
  //       component: () => import('@/views/financial/they-deal'),
  //       meta: { title: '网校交易', icon: 'link' }
  //     }
  //   ]
  // },

  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
  //       meta: { title: 'External Link', icon: 'link' }
  //     }
  //   ]
  // }
]

export const asyncRoutes = [
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/role',
    name: 'permission',
    meta: { title: '权限控制', icon: 'el-icon-s-help', roles: ['admin'] },
    children: [
      {
        path: 'role',
        name: 'Role',
        component: () => import('@/views/permission/role'),
        meta: { title: '角色管理', icon: 'table', roles: ['admin'] }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
