import request from '@/libs/utils/request';

const options = ['GET', 'HEAD', 'POST', 'PUT', 'DELETE', 'CONNECT', 'OPTIONS', 'TRACE'];
const http = (address, arg, config) => {
  let params = null;
  let data = null;
  if (arg.params) {
    params = arg.params;
  }
  if (arg.data) {
    data = arg.data;
  }
  const method = address.split(' ')[0];
  const url = address.split(' ')[1];
  if (options.indexOf(method.toUpperCase()) === -1) {
    console.error('请指定请求方法GET , HEAD, POST, PUT, DELETE, CONNECT, OPTIONS, TRACE');
    return;
  }
  if (!url) {
    console.error('url不能为空');
    return;
  }
  console.info('indexOf address success');
  const configs = {
    url: url,
    method: method,
    params,
    data,
    ...config
  };
  return request(configs);
};

export default http;
