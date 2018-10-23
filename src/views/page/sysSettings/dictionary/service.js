// import request from '@/libs/utils/request';

export function fetchList(query) {
  return new Promise((resolve, reject) => {
    const res = {
      data: {
        items: [
          { id: 1, key: 'pageNo', label: '默认页数', value: 1, group: 'sysConfig', childCount: '5', createTime: new Date().getTime() },
          { id: 2, key: 'pageSize', label: '默认条数', value: 10, group: 'sysConfig', childCount: '5', createTime: new Date().getTime() }
        ],
        total: 2
      }
    };
    resolve(res);
  });
}
