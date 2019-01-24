import { asyncRouterMap, constantRouterMap } from '@/router';
import Layout from '@/views/layout/Layout';
const _import = require('@/router/_import_' + process.env.NODE_ENV); // 获取组件的方法
/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(asyncRouterMap, roles) {
  roles.map(route => {
    const r = asyncRouterMap.get(route.name);
    if (r) {
      route.component = _import(r.component);
    }
    if (route.children) {
      route.component = Layout;
      route.children = filterAsyncRouter(asyncRouterMap, route.children);
    }
  });
  return roles;
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers;
      state.routers = constantRouterMap.concat(routers);
    }
  },
  actions: {
    // GenerateRoutes({ commit }, data) {
    //   return new Promise(resolve => {
    //     const { roles } = data;
    //     let accessedRouters;
    //     if (roles.indexOf('admin') >= 0) {
    //       accessedRouters = asyncRouterMap;
    //     } else {
    //       accessedRouters = filterAsyncRouter(asyncRouterMap, roles);
    //     }
    //     commit('SET_ROUTERS', accessedRouters);
    //     resolve();
    //   });
    // },
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        const { menuList } = data;
        // if (menuList.indexOf('admin') >= 0) {
        //   accessedRouters = asyncRouterMap;
        // } else {
        const accessedRouters = filterAsyncRouter(asyncRouterMap, menuList);
        // }
        commit('SET_ROUTERS', accessedRouters);
        resolve();
      });
    }
  }
};

export default permission;
