import { asyncRouterMap, constantRouterMap } from '@/router'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission (roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRouterMap
 * @param roles
 */
export function filterAsyncRouterMap (routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRouterMap(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

// const state = {
//   routes: [],
//   addRoutes: []
// }

// const mutations = {
//   SET_ROUTES: (state, routes) => {
//     state.addRoutes = routes
//     state.routes = constantRouterMap.concat(routes)
//   }
// }

// const actions = {
//   generateRoutes ({ commit }, roles) {
//     return new Promise(resolve => {
//       let accessedRoutes
//       if (roles.includes('admin')) {
//         accessedRoutes = asyncRouterMap || []
//       } else {
//         accessedRoutes = filterAsyncRouterMap(asyncRouterMap, roles)
//       }
//       commit('SET_ROUTES', accessedRoutes)
//       resolve(accessedRoutes)
//     })
//   }
// }
const permission = {
  state: {
    routes: [],
    addRoutes: []
  },
  mutations: {
    SET_ROUTES: (state, routes) => {
      state.addRoutes = routes
      state.routes = constantRouterMap.concat(routes)
    }
  },
  actions: {
    generateRoutes ({ commit }, roles) {
      return new Promise(resolve => {
        let accessedRoutes
        if (roles.includes('leader')) {
          accessedRoutes = asyncRouterMap || []
        } else {
          accessedRoutes = filterAsyncRouterMap(asyncRouterMap, roles)
        }
        commit('SET_ROUTES', accessedRoutes)
        resolve(accessedRoutes)
      })
    }
  }
}
export default permission
