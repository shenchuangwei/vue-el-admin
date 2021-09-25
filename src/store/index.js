import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import goods_create from "./modules/goods_create";
import user from "./modules/user";

export default new Vuex.Store({
    modules: {goods_create, user}
})