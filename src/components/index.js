import Vue from 'vue';
import IconBtn from './IconBtn';
import SearchTem from './SearchTem';

const install = function (Vue, options = {}) {
  // 静态方法
  if (install.installed) return;
  install.installed = true;
  // 组件
  // Vue.component('hyButton', hyButton);
  Vue.component('iconBtn', IconBtn);
  Vue.component('SearchTem', SearchTem);
};
var components = {install};

Vue.use(components);

export default {components};
