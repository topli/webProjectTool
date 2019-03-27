import router from './router';
import store from './store';
// import { Message } from 'element-ui';
import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css';// progress bar style
import { getToken } from '@/libs/utils/auth'; // getToken from cookie

NProgress.configure({ showSpinner: false });// NProgress Configuration

const whiteList = ['/login'];// no redirect whitelist

router.beforeEach((to, from, next) => {
  NProgress.start(); // start progress bar
  if (getToken()) { // determine if there has token
    /* has token*/
    if (to.path === '/login') {
      next({ path: '/' });
      NProgress.done(); // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
      if (store.getters.addRouters.length === 0) {
        store.dispatch('getUserInfo').then(res => { // 拉取user_info
          const roles = res.roles;
          store.dispatch('GenerateRoutes', { roles }).then(() => { // 根据roles权限生成可访问的路由表
            router.addRoutes(store.getters.addRouters); // 动态添加可访问路由表
            next({ ...to, replace: true }); // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
          });
        }).catch(err => {
          // todo 退出登录
          console.log(err);
        });
      } else {
        // todo 加载按钮权限
        next();
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next();
    } else {
      next('/login'); // 否则全部重定向到登录页
      NProgress.done(); // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }
});

router.afterEach(() => {
  NProgress.done(); // finish progress bar
});
