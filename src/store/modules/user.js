export default {
    actions: {},
    mutations: {
        //初始化session中的user和token
        __initUser(state) {
            const user = window.sessionStorage.getItem('user')
            if (user) {
                state.user = JSON.parse(user)
                state.token = state.user.token
            }
        },
        login(state, user) {
            state.user = user
            state.token = user.token
            // console.log(state.user);
            window.sessionStorage.setItem('user',JSON.stringify(user))
            window.sessionStorage.setItem('token',JSON.stringify(user.token))
        }
    },
    state: {
        user: [],
        token: ''
    },
    getters: {}
}