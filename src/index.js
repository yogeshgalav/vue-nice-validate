import FormMixin from "./form-mixin";

function install(Vue) {
  if (install.installed) return;
  install.installed = true;
  Vue.component("vue-nice-pagination", FormMixin);
}

const plugin = {
  install
};

let GlobalVue = null;
if (typeof window !== "undefined") {
  GlobalVue = window.Vue;
} else if (typeof global !== "undefined") {
  GlobalVue = global.vue;
}
if (GlobalVue) {
  GlobalVue.use(plugin);
}

FormMixin.install = install;

export default FormMixin;