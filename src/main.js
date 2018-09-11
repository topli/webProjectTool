import Vue from 'vue';

import 'normalize.css/normalize.css';// A modern alternative to CSS resets

import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import 'static/styles/index.scss'; // global css

import App from './App';
import router from './router';
import store from './store';

import i18n from './lang'; // Internationalization
import './icons'; // icon
import './errorLog';// error log
import './permission'; // permission control
import './libs/mock'; // simulation data

import * as filters from './libs/filters'; // global filters

import directive from './libs/directive'; // global directive

import './components'; // global components

Vue.use(Element, {
  size: 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
});

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[ key ]);
});

Vue.use(directive); // 加载指令

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
});
