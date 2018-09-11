import request from '@/libs/utils/request';

export function userSearch(name) {
  return request({
    url: '/search/user',
    method: 'get',
    params: { name }
  });
}
