import http from '@/libs/utils/http';

export const fetchList = (query) => http('get /user/list', { params: query });

export const addData = (data) => http('post /user/list', { data: data });
