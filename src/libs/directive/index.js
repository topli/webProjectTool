/**
 *  描述：Global directive js
 */

import Vue from 'vue';
import store from '@/store';

const install = Vue => {
  // 按钮权限
  Vue.directive('btnAuth', {
    bind: (el, binding) => {
      var btnRoles = store.getters.btnRoles;
      var authCode = binding.value || '';
      if (!authCode) return;
      if (btnRoles && btnRoles.length > 0) {
        if (btnRoles.indexOf(authCode)) {
          el.style.display = 'none';
          el.remove();
        }
      } else {
        el.style.display = 'none';
        el.remove();
      }
    }
  });
};
var directive = { install };

Vue.use(directive);

export default install;
