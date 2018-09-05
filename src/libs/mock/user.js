import Mock from 'mockjs'

const List = []
const count = 20

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@guid()',
    username: '@name',
    createTime: +Mock.Random.date('T'),
    'age|1-80': 80
  }))
}

export default {
  getList: () => {
    return {
      total: List.length,
      items: List
    }
  }
}
