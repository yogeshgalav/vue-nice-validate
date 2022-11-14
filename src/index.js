import VueNiceValidate from "./VueNiceValidate.js";

function install(Vue) {
  if (install.installed) return;
  install.installed = true;
  Vue.mixin(VueNiceValidate);
}

export default function validatePlugin(){
  return install; 
}

export const ValidateMixin = VueNiceValidate;