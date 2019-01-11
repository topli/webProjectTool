import Vue from 'vue';
import Main from './index.vue';
// import { PopupManager } from 'element-ui/src/utils/popup';
const MessageConstructor = Vue.extend(Main);

let instance;
const instances = [];
let seed = 1;

const Message = function(component, options) {
  if (Vue.prototype.$isServer) return;
  options = options || {};
  const userOnClose = options.onClose;
  const id = 'dialog_' + seed++;

  options.onClose = function() {
    Message.close(id, userOnClose);
  };
  options.component = component.name || 'component';
  options.componentData = options.data;
  instance = new MessageConstructor({
    data: options
  });
  instance.$options.components[component.name || 'component'] = component;
  instance.id = id;
  instance.$store = this.$store;
  instance.vm = instance.$mount();
  document.body.appendChild(instance.vm.$el);
  instance.dom = instance.vm.$el;
  // instance.dom.style.zIndex = PopupManager.nextZIndex();
  instances.push(instance);
  return instance.vm;
};

Message.close = function(id, userOnClose) {
  for (let i = 0, len = instances.length; i < len; i++) {
    if (id === instances[i].id) {
      if (typeof userOnClose === 'function') {
        userOnClose(instances[i]);
      }
      document.body.removeChild(instances[i].vm.$el);
      instances.splice(i, 1);
      break;
    }
  }
};

Message.closeAll = function() {
  for (let i = instances.length - 1; i >= 0; i--) {
    instances[i].close();
  }
};

export default Message;
