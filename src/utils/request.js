import axios from 'axios'
// import { MessageBox, Message } from 'iview'
import store from '@/store'
// import { getToken } from '@/utils/Cookie'
import router from '../router'

// 创建axios实例
const service = axios.create({
  baseURL: 'http://localhost:8080/static', // 请求地址公用部分
  timeout: 5000 // 请求超时
})

// request 拦截器
service.interceptors.request.use(
  config => {
    // 发送请求前做一些操作
    if (store.getters.token) {
      // 设置请求头
      // config.headers['X-Token'] = getToken()
    }
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    // 请求成功后做一些操作
    const res = response.data
    if (res.code !== 200) {
      // Message({
      //   message: res.message || 'Error',
      //   type: 'error',
      //   duration: 5 * 1000
      // })

      // 50008: 非法Token; 50012: 其他客户登录; 50014: Token过期;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // 重新登录
        // MessageBox.confirm('您已经注销，您可以取消以停留在此页面，或再次登录', '确认注销', {
        //   confirmButtonText: '重新登录',
        //   cancelButtonText: '取消',
        //   type: 'warning'
        // }).then(() => {
        //   router.push('/login')
        // })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error)
    // Message({
    //   message: error.message,
    //   type: 'error',
    //   duration: 5 * 1000
    // })
    return Promise.reject(error)
  }
)

export default service
