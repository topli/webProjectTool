import Vue from 'vue';
import IconBtn from './IconBtn';
import SearchTem from './SearchTem';
import TableForColumn from './TableForColumn';
import OrgTree from './OrgTree';

const install = function(Vue, options = {}) {
  // 静态方法
  if (install.installed) return;
  install.installed = true;
  // 组件
  Vue.component('iconBtn', IconBtn);
  Vue.component('SearchTem', SearchTem);
  Vue.component('TForColumn', TableForColumn);
  Vue.component('OrgTree', OrgTree);
};
var components = { install };

Vue.use(components);

export default { components };
