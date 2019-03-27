import axios from 'axios';
import { Message } from 'element-ui';
import store from '@/store';
import { getToken } from '@/libs/utils/auth';

// create an axios instance
const service = axios.create({
  // baseURL: process.env.BASE_API + '/api/', // api的base_url
  timeout: 5000 // request timeout
});

// request interceptor
service.interceptors.request.use(config => {
  // Do something before request is sent
  if (store.getters.token) {
    // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
    config.headers['X-Token'] = getToken();
  }
  // set loading
  store.dispatch('setAL', true);
  return config;
}, error => {
  // Do something with request error
  Promise.reject(error);
});
// respone interceptor
service.interceptors.response.use(
  response => {
    // set loading
    store.dispatch('setAL', false);
    let message = '';
    if (response) {
      if (response.status === 200) return response.data;
      switch (response.status) {
        case 401: {
          message = '无权限访问。';
          // todo 退出登录
          store.dispatch('FedLogOut');
          break;
        }
        default: {
          message = response.data.message;
          break;
        }
      }
      Message({
        message: message,
        type: 'error',
        duration: 5 * 1000
      });
      return response.data;
    }
  },
  error => {
    // set loading
    store.dispatch('setAL', false);
    return Promise.reject(error);
  });

export default service;
