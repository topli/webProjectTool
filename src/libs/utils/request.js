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
    const res = response.data;
    if (res) {
      if (res.code !== 200) {
        Message({
          message: res.message,
          type: 'error',
          duration: 5 * 1000
        });
      }
    }
    return res;
  },
  error => {
    // set loading
    store.dispatch('setAL', false);
    console.log(error); // for debug
    // 根据后台权限码提示信息
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    });
    return Promise.reject(error);
  });

export default service;
