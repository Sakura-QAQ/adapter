// 配置axios
import axios from 'axios'
import JSONBig from 'json-bigint'
// import Message from 'element-ui'
const instance = axios.create({
  // 配置对象 基准路径 外部信息
  baseURL: 'https://free-api.heweather.net/s6/weather',
  // 设置超时的连接时间
  // timeout: 1000,
  transformResponse: [(data) => {
    // 对data进行任意格式的转换
    if (data) {
      return JSONBig.parse(data)
    }
    return data
  }]
})

// instance.interceptors.request.use(config => {
//   // 给头部加上认证信息
//   const user = window.sessionStorage.getItem('token')
//   // console.log(JSON.parse(user).token)
//   if (user) {
//     config.headers = {
//       // Authorization: 'Bearer ' + JSON.parse(user).token
//       token: JSON.parse(user).token
//     }
//   }
//   return config
// }, error => {
//   return Promise.reject(error)
// })

export default instance
