import Vue from "vue";
import VueRouter from "vue-router";
//引入路由组件
import routes from "./common/config/router";

Vue.use(VueRouter);
const router = new VueRouter({
    routes,
})
router.beforeEach((to, from, next) => {
    if (window.sessionStorage.getItem('token')) {
        //防止重复登陆
        /*if (to.path === '/login') {
            Vue.prototype.$message.error('请不要重复登陆')
            return next(from.path)
        }*/
        return next()
    }
    if (to.path === '/login') {
        return next()
    } else {
        Vue.prototype.$message.error('请登录您的账号！')
        next('/login')
    }
})
//解决重复点击导航时，控制台出现报错
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(to) {
    return VueRouterPush.call(this, to).catch(err => err)
}
export default router
