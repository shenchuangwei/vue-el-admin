import Vue from "vue";
import VueRouter from "vue-router";
//引入路由组件
import routes from "./common/config/router";

Vue.use(VueRouter);
const router = new VueRouter({
    routes,
})
//解决重复点击导航时，控制台出现报错
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(to) {
    return VueRouterPush.call(this, to).catch(err => err)
}
export default router
