import Vue from 'vue';
import Main from './index.vue';
const Dialog = Vue.extend(Main);

let instance;
const instances = [];
let seed = 1;

const DialogBox = function(component, options) {
  options = options || {};
  const userOnClose = options.onClose;
  const id = 'dialog_' + seed++;

  options.onClose = function() {
    DialogBox.close(id, userOnClose);
  };
  options.component = component.name || 'component';
  options.componentData = options.data || {};
  instance = new Dialog({
    data: options,
    store: this.$store
  });
  instance.vm = instance.$mount();
  instance.$options.components[component.name || 'component'] = component;
  instance.id = id;
  document.body.appendChild(instance.vm.$el);
  instances.push(instance);
  return instance.vm;
};

DialogBox.close = function(id, userOnClose) {
  for (let i = 0, len = instances.length; i < len; i++) {
    if (id === instances[i].id) {
      if (typeof userOnClose === 'function') {
        userOnClose(instances[i]);
      }
      // 释放内存
      instances[i].$destroy();
      document.body.removeChild(instances[i].vm.$el);
      instances.splice(i, 1);
      break;
    }
  }
};

DialogBox.closeAll = function() {
  for (let i = instances.length - 1; i >= 0; i--) {
    instances[i].close();
  }
};

export default DialogBox;
