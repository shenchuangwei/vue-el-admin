import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
//引入element
import './plugins/element'
//引入外部封装的topbar,并放到vue原型上
import $conf from './common/config/config'
//引入路由器
import VueRouter from "vue-router";
import router from "./router";
import store from "./store";

import {Message} from 'element-ui'
// 添加请求拦截器
axios.interceptors.request.use(config => {
    // 添加header头的token
    if (config.token === true) {
        config.headers.token = window.sessionStorage.getItem('token')
    }
    // 在发送请求之前做些什么
    return config;
}, error => {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(response => {
    console.log('响应拦截器 成功');
    // 对响应数据做点什么
    return response;
}, err => {
    // 全局错误提示
    if (err.response && err.response.data && err.response.data.errorCode) {
        Message.error(err.response.data.msg)
    }
    // 对响应错误做点什么
    return Promise.reject(err);
});
Vue.use(VueRouter);
Vue.config.productionTip = false
Vue.prototype.$conf = $conf
new Vue({
    render: h => h(App),
    store,
    router
}).$mount('#app')
