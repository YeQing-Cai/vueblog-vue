import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Element from 'element-ui'
import "element-ui/lib/theme-chalk/index.css"
import axios from 'axios'
import "./axios"
import "./permission"
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

Vue.config.productionTip = false
Vue.use(Element)
Vue.use(mavonEditor)
Vue.prototype.$axios = axios //
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
const gobalFunc = { // 全局混入内容（你可以把element的全局提示、弹窗什么的混入进去）
  go(path, isReplace = false) { // 路由跳转、替换
    isReplace ? this.$router.replace(path) : this.$router.push(path);
  },
  goBack(detail = -1) { // 路由返回(默认-1，返回1级)
    this.$router.go(detail);
  },
  laterGoBack(time = 1000) { // 延迟(默认1秒)返回
    setTimeout(() => {
      this.goBack();
    }, time);
  }
};
const install = Vue => { // 把混入内容挂载到vue原型上的方法：this对象挂载
  Object.keys(gobalFunc).forEach(key => {
    Vue.prototype[key] = gobalFunc[key];
  });
};
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}
Vue.use(install); // vue全局混入