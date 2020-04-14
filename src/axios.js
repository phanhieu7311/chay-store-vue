import axios from 'axios'
import VueCookies from 'vue-cookies'
import Vue from 'vue'
Vue.use(VueCookies)
let axios_cus = axios.create({
  baseURL: 'http://localhost:1337'
  // withCredentials: true
})
// Add a request interceptor

axios_cus.interceptors.response.use(
  response => response,
  error => {
    const { status } = error.response
    if (status === 401 || status === 422) {
      return error.response
    }
    return Promise.reject(error)
  }
)
axios_cus.defaults.headers.common = { Authorization: `Bearer ${window.$cookies.get('access_token')}` }

export default axios_cus