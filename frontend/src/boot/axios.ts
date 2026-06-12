import { boot } from 'quasar/wrappers'
import axios, { type AxiosInstance } from 'axios'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $api: AxiosInstance
  }
}

const api = axios.create({
  baseURL: 'http://localhost:3333/api/v1',
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

export default boot(({ app }) => {
  app.config.globalProperties.$api = api
})

export { api }
