import { TokenStore } from "@/stores/tokenStore";
import axios from "axios";
import { ElMessage, ElMessageBox } from 'element-plus';

const HEADERS_TOKEN_KEY: string = 'X-Token'

const service = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 5000
})

service.interceptors.request.use(
  config => {
    const tokenStore = TokenStore();
    const token = tokenStore.getToken();
    if (token !== null) {
      config.headers[HEADERS_TOKEN_KEY] = token;
    }
    return config;
  },
  err => {
    console.error(err);
    return Promise.reject(err);
  }
)

service.interceptors.response.use(
  response => {
    const result = response.data;
    if (!result.success) {
      ElMessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
        confirmButtonText: 'Re-Login',
        cancelButtonText: 'Cancel',
        type: 'warning'
      })
      return Promise.reject(new Error(result.errMessage || 'Error'))
    }
    return result;
  },

  err => {
    ElMessage({
      message: err.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(err);
  }
)

export default service
