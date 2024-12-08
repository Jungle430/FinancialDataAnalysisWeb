import { TokenStore } from "@/stores/tokenStore";
import axios from "axios";
import { message } from 'ant-design-vue';

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
    message.error('网络或服务器错误,请稍后重试!');
    return Promise.reject(err);
  }
)

service.interceptors.response.use(
  response => {
    const result = response.data;
    if (!result.success) {
      switch (result.code) {
        case 510:
          message.error(result.errMessage || '没有权限,请登陆!');
          break;
        default:
          message.error(result.errMessage || '服务器错误,请稍后重试!');
          break;
      }
      return Promise.reject(new Error(result.errMessage || 'Error'))
    }
    return result;
  },

  err => {
    message.error('网络或服务器错误,请稍后重试!');
    return Promise.reject(err);
  }
)

export default service
