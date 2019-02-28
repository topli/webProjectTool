import Vue from 'vue';
import Main from './index.vue';
let instance;
const instances = [];
let seed = 1;
const Dialog = function (component, options) {
  const id = 'dialog_' + seed++;
  options.component = component.name || 'component';
  options.componentData = options.data || {};
  const VueDialogBox = Vue.extend(Main);
  instance = new VueDialogBox({
    data: options,
    store: this.$store
  });
  instance.close = (id) => {
    document.body.removeChild(instance.vm.$el);
  };
  instance.id = id;
  instance.$options.components[component.name || 'component'] = component;
  instance.vm = instance.$mount();
  document.body.appendChild(instance.vm.$el);
  instances.push(instance);
  console.log(instance);
};
Dialog.close = function (id) {
  console.log(id);
};
export default Dialog;
