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
            window.sessionStorage.setItem('user', JSON.stringify(user))
            window.sessionStorage.setItem('token', user.token)
        },
        logExit(state) {
            state.user = []
            state.token = false
            window.sessionStorage.clear()
        }
    },
    state: {
        user: [],
        token: false
    },
    getters: {}
}
