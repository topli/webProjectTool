import Vue from 'vue';
import Router from 'vue-router';
// import routerView from '@/routerView';
Vue.use(Router);

/* Layout */
import Layout from '@/views/layout/Layout';

/** note: submenu only apppear when children.length>=1
 *   detail see  https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 **/

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
 **/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  // { path: '/authredirect', component: () => import('@/views/login/authredirect'), hidden: true },
  { path: '/404', component: () => import('@/views/errorPage/404'), hidden: true },
  { path: '/401', component: () => import('@/views/errorPage/401'), hidden: true },
  {
    path: '', component: Layout, redirect: 'dashboard', children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'dashboard',
        meta: {
          title: 'dashboard',
          icon: 'dashboard',
          noCache: true
        }
      }
    ]
  }
];

export default new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
});

export const asyncRouterMap = [
  {
    path: '/userCenter',
    component: Layout,
    alwaysShow: true, // will always show the root menu
    meta: {
      title: 'userCenter',
      icon: 'user'
    },
    children: [
      {
        path: 'userManage',
        component: () => import('@/views/page/userCenter/user/index'),
        name: 'userManage',
        meta: {
          title: 'userManage'
        }
      },
      {
        path: 'orgManage',
        component: () => import('@/views/page/userCenter/org/index'),
        name: 'orgManage',
        meta: {
          title: 'orgManage'
        }
      },
      {
        path: 'roleManage',
        component: () => import('@/views/page/userCenter/role/index'),
        name: 'roleManage',
        meta: {
          title: 'roleManage'
        }
      }
    ]
  },
  {
    path: '/sysSettings',
    component: Layout,
    alwaysShow: true, // will always show the root menu
    meta: {
      title: 'sysSettings',
      icon: 'settings'
    },
    children: [
      {
        path: 'resources',
        component: () => import('@/views/page/sysSettings/resources/index'),
        name: 'resources',
        meta: {
          title: 'resources'
        }
      },
      {
        path: 'dictionary',
        component: () => import('@/views/page/sysSettings/dictionary/index'),
        name: 'dictionary',
        meta: {
          title: 'dictionary'
        }
      }
    ]
  },
  {
    path: '/map',
    component: Layout,
    meta: {
      title: 'map',
      icon: 'icon'
    },
    children: [
      {
        path: 'map',
        component: () => import('@/views/page/map/index'),
        name: 'map',
        meta: {
          title: 'map',
          icon: 'icon'
        }
      }
    ]
  },
  {
    path: '/dialogBox',
    component: Layout,
    meta: {
      title: 'dialogBox',
      icon: 'icon'
    },
    children: [
      {
        path: 'dialogBox',
        component: () => import('@/views/page/dialogBox/index'),
        name: 'dialogBox',
        meta: {
          title: 'dialogBox',
          icon: 'icon'
        }
      }
    ]
  },
  { path: '*', redirect: '/401', hidden: true }
];
