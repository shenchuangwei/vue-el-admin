import Vue from "vue";
import VueRouter from "vue-router";
//引入路由组件
import routes from "./common/config/router";
Vue.use(VueRouter);
export default new VueRouter({routes})