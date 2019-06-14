
const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,

  roles: state => state.user.roles,
  token: state => state.user.token,
  name: state => state.user.name,

  addRoutes: state => state.permission.addRoutes,
  // 总路由
  Pess_router: state => state.permission.routes
}

export default getters
