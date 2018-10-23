import request from '@/libs/utils/request';

export function fetchList(query) {
  return request({
    url: '/user/list',
    method: 'get',
    params: query
  });
}
