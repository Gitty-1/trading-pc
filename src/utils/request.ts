import axios from 'axios'
import Alert from './alert'
import { alertText, alertStatus } from '@/string'

const service = axios.create({
  timeout: 2 * 1000,
})

// 请求拦截器
service.interceptors.request.use(
  config => config,
  error => Promise.reject(error),
)

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const code = response.data.code ;//若未设置默认成功状态
    switch (code) {
      case 200://为200执行该行
        return response.data;//成功直接返回
      default://不是则执行该行
        Alert(response.data.message, alertStatus.error)
        return Promise.reject(response)
    }
  },
  (error) => {
    Alert(alertText.networkWrong, alertStatus.error)
    return Promise.reject(error);
  },
)

export default service
