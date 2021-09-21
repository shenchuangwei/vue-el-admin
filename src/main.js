import Vue from 'vue'
import App from './App.vue'
//引入element
import './plugins/element'
//引入外部封装的topbar,并放到vue原型上
import $conf from './common/config/config'
//引入路由器
import VueRouter from "vue-router";
import router from "./router";


Vue.use(VueRouter);
Vue.config.productionTip = false
Vue.prototype.$conf = $conf
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
