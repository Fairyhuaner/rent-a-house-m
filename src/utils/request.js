//
import axios from 'axios'
import store from '@/store'
/**
 * 请求模块
 */
const instance = axios.create({
  baseURL: 'http://liufusong.top:8080/',
  timeout: 10000
})
export default instance

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  const { user } = store.state
  if (user && user.token) {
    config.headers.Authorization = `${user.token}`
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})
