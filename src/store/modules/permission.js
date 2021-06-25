import { asyncRoutes, constantRoutes } from '@/router'
import { getMyRoutes } from '@/api/role'
import { mapComponent } from '@/utils/mapRouter'
/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: [],
  serverRoutes: [] // 后端返回路由表
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  },
  SET_SERVERROUTES: (state, serverRouters) => {
    state.serverRouters = serverRouters
  }
}

const actions = {
  // 前端操作路由表
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      let accessedRoutes
      if (roles.includes('admin')) {
        accessedRoutes = asyncRoutes || []
      } else {
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      }
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  },
  // 后端返回路由表
  async generServerRoutes({ commit }, roles) {
    let routes = await getMyRoutes(roles)
    routes = routes.data
    mapComponent(routes)
    commit('SET_ROUTES', routes)
    return routes
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
