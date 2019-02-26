import { asyncRouterMap, constantRouterMap } from '@/router';

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route) {
    return roles.some(role => route === role);
  } else {
    return true;
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(asyncRouterMap, roles, level = 0) {
  level += 1;
  const accessedRouters = asyncRouterMap && asyncRouterMap.filter(route => {
    // 允许的菜单深度
    if (level > permission.state.level) {
      return false;
    }
    // 如果有子级往下一直循环
    if (route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children, roles, level);
      if (!route.children.length) return false;
      return true;
    } else if (hasPermission(roles, route.name)) {
      return true;
    }
    return false;
  });
  return accessedRouters;
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: [],
    level: 3
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers;
      state.routers = constantRouterMap.concat(routers);
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        const { roles } = data;
        const  accessedRouters = filterAsyncRouter(asyncRouterMap, roles);
        console.log(accessedRouters);
        commit('SET_ROUTERS', accessedRouters);
        resolve();
      });
    }
  }
};

export default permission;
