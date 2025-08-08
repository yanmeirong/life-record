// import axios from 'axios'
// import { getToken, removeToken } from '@/utils/auth'

// // 创建axios实例
// const service = axios.create({
//   baseURL: 'http://localhost:5000/api', // 后端API基础路径
//   timeout: 10000 // 请求超时时间
// })

// // 请求拦截器
// service.interceptors.request.use(
//   config => {
//     // 如果有token，添加到请求头
//     const token = getToken()
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`
//     }
//     return config
//   },
//   error => {
//     // 处理请求错误
//     console.error('请求错误:', error)
//     return Promise.reject(error)
//   }
// )

// // 响应拦截器
// service.interceptors.response.use(
//   response => {
//     // 处理成功响应
//     return response.data
//   },
//   error => {
//     // 处理错误响应
//     console.error('响应错误:', error)
    
//     // 未授权，token过期或无效
//     if (error.response && error.response.status === 401) {
//       removeToken()
//       // 跳转到登录页
//       uni.navigateTo({
//         url: '/pages/login/login'
//       })
//       uni.showToast({
//         title: '登录已过期，请重新登录',
//         icon: 'none'
//       })
//     } else {
//       // 显示错误信息
//       const message = error.response?.data?.message || '请求失败，请稍后重试'
//       uni.showToast({
//         title: message,
//         icon: 'none'
//       })
//     }
    
//     return Promise.reject(error)
//   }
// )

// export default service
    