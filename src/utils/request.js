import axios from 'axios'
// 导入 pinia 仓库
import { useUserStore } from '@/stores/index'
// 导入elmessage提示
import { ElMessage } from 'element-plus'

const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 5000,
  // 先不配置请求头 --- 配置之后会有跨域问题
  // headers: {'X-Custom-Header': 'foobar'}
})

// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    // 先判断pinia仓库中有无 Token
    const userStore = useUserStore()
    // 如果具有token，就是登录状态 --- 给request请求头加上token
    if (userStore.token) {
      config.headers.Authorization = userStore.token
    }
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  },
)

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。 --- 这里200指的是status200

    // 这个response.code200 是指请求成功，但是用户名和用户密码也要正确，
    // 因为不正确的用户名和密码也会正确响应status200但是response.code不会是200
    if (response.data.code === 200) {
      return response
    }
    ElMessage.error(response.data.message)
    // 对响应数据做点什么
    return response
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    // 先声明提示消息
    let message = ''
    // 判断错误类型
    switch (error.status) {
      case 401:
        message = 'Token 过期'
        // 我觉得这个应该要重新登录
        break
      case 403:
        message = '无权访问'
        break
      case 404:
        message = '请求地址出错'
        break
      case 500:
        message = '服务器出现问题'
        break
      default:
        message = '网络出现问题'
    }
    ElMessage.error(message)
    return Promise.reject(error)
  },
)

export default instance
