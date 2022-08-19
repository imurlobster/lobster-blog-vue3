import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'

const isDev = true

const service: AxiosInstance = axios.create({
   baseURL: isDev ? '/api': 'http://localhost:9607/posts',
   timeout: 6000
})

service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    return config
  },
  (error: any) => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  async (res: AxiosResponse) => {
    if(res.status == 200) {
      const data = res.data;
      if(data.code == 0) {
        return data.data
      } else {
        ElMessage({
          message: data.msg,
          type: 'error'
        })
      }
    } else {
      ElMessage({
        message: "网络错误!",
        type: "error"
      });

      return Promise.reject(new Error(res.data.msg) || 'error')
    }
  },
  (error: any) => {
    const { response } = error;
    if(response) {
      // 请求已发出,但是不在2xx的范围
      ElMessage({
        message: "网络错误!",
        type: "error"
      });
      return Promise.reject(error)
    }
  }
)

export default service