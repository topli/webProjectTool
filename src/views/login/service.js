import http from '@/libs/utils/http';

export const login = (query) => http('post /api/auth', { data: query });

export const getUserInfo = (query) => http('get /api/user-center/user/loginInfo');

export const loginOut = () => http('delete /api/auth');
