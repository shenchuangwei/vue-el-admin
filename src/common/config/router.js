const routes = [
    {
        name: 'layout',
        path: '/',
        //默认跳转到index首页，也可以在直接指定路径
        redirect: {name: 'index'},
        component: 'layout',
        children: [
            {
                /*path: '/index',
                name: 'index',*/
                //component:()=>import('../../views/index/index.vue')
                meta:{title:'后台首页'},
                component: 'index/index'
            },
            {
                meta:{title:'商品列表'},
                component: 'shop/goods/list'
            }
        ]
    },
    {
        /*name: 'login',
        path: '/login',*/
        meta:{title:'登录页'},
        component: 'login/index'
    },
    //路由重定向
    {
        path: '*',
        redirect: '/index',
    }
]
//获取路由
const getRoutes = function () {
    createRoute(routes);
    return routes
}
//去除index
function getValue(str){
    const index = str.lastIndexOf('/');
    const val = str.substring(index+1,str.length);
    if (val === 'index') return str.substring(index,-1)
    return str
}
//定义自动生成路由方法
function createRoute(arr) {
    arr.forEach(element => {
        if (!element.component) return
        const val = getValue(element.component)
        // 生成name
        element.name = element.name || val.replace(/\//g,'_')
        // 生成path
        element.path = element.path || `/${val}`        //自动生成component
        const componentFun = import(`../../views/${element.component}.vue`)
        element.component = ()=>componentFun
        //如果该路由下还有子路由继续执行createRoute方法,递归调用
        if (element.children && element.children.length > 0) createRoute(element.children)
    })
}

//暴露路由文件
export default getRoutes();