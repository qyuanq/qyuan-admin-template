/**
 * 后端返回路由表做映射
 */
const map = {
  'views/login/index': () => import('@/views/login/index'),
  'views/404': () => import('@/views/404'),
  'layout': () => import('@/layout'),
  'views/home/index': import('@/views/home/index'),
  'views/school/student': () => import('@/views/school/student'),
  'views/school/learning': () => import('@/views/school/learning'),
  'views/school/setting': () => import('@/views/school/setting'),
  'views/shop/goods-manage': () => import('@/views/shop/goods-manage'),
  'views/shop/virt-list': () => import('@/views/shop/virt-list'),
  'views/shop/trade-stat': () => import('@/views/shop/trade-stat'),
  'views/shop/upload-big-file': () => import('@/views/shop/upload-big-file'),
  'views/nested/menu1/index': () => import('@/views/nested/menu1/index'),
  'views/nested/menu1/menu1-1': () => import('@/views/nested/menu1/menu1-1'),
  'views/nested/menu1/menu1-2': () => import('@/views/nested/menu1/menu1-2'),
  'views/nested/menu1/menu1-2/menu1-2-1': () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
  'views/nested/menu1/menu1-2/menu1-2-2': () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
  'views/nested/menu1/menu1-3': () => import('@/views/nested/menu1/menu1-3'),
  'views/nested/menu2/index': () => import('@/views/nested/menu2/index'),
  'views/nested/menu2/menu2-6/highSeas': () => import('@/views/nested/menu2/menu2-6/highSeas'),
  'views/nested/menu3/index': () => import('@/views/nested/menu3/index'),
  'views/educational/student-status': () => import('@/views/educational/student-status'),
  'views/educational/teaching': () => import('@/views/educational/teaching'),
  'views/educational/examination': () => import('@/views/educational/examination'),
  'views/financial/paycost': () => import('@/views/financial/paycost'),
  'views/financial/lackof': () => import('@/views/financial/lackof'),
  'views/financial/they-deal': () => import('@/views/financial/they-deal'),
  'views/permission/role': () => import('@/views/permission/role')
}

export function mapComponent(serviceMap) {
  serviceMap.forEach(route => {
    if (route.component) {
      route.component = map[route.component]
    }
    if (route.children) {
      // route.children.map(child => mapComponent(child))
      mapComponent(route.children)
    }
  })
}
