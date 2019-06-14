import { login, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/Cookie'
const user = {
  state: {
    token: getToken(),
    roles: [],
    avatar: '',
    name: ''
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction
    }
  },
  actions: {
    // 用户登录
    login ({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then(response => {
          commit('SET_TOKEN', response.token)
          setToken(response.token)
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 获取用户信息
    GetInfo ({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token).then(response => {
          const { data } = response
          if (!data) {
            // eslint-disable-next-line prefer-promise-reject-errors
            reject('验证失败，请重新登录。')
          }

          const { roles, name } = data

          // 角色必须是非空数组
          if (!roles || roles.length <= 0) {
            // eslint-disable-next-line prefer-promise-reject-errors
            reject('getInfo:角色必须是非空数组!')
          }

          commit('SET_ROLES', roles)
          commit('SET_NAME', name)
          console.log('用户信息', data)
          resolve(response)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 删除token
    resetToken ({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resolve()
      })
    }
  }
}

export default user
