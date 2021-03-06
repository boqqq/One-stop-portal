import Vue from 'vue'
import Router from 'vue-router'
import BaseLayout from '@/page/layout/BaseLayout'

Vue.use(Router)
// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/index',
        },
        {
            path: '/index',
            component: BaseLayout,
            children: [
                //首页
                {
                    name: 'index',
                    path: '/index',
                    redirect: '/applicationList',
                    component: resolve => require(['@/page/home/index'], resolve),
                    meta: {keepAlive: false}// 缓存
                },
                {
                    name: 'applicationList',
                    path: '/applicationList',
                    component: resolve => require(['@/page/application/applicationList'], resolve),
                },
                {
                    name: 'componentList',
                    path: '/componentList',
                    component: resolve => require(['@/page/component/componentList'], resolve),
                },
                {
                    name: 'dataList',
                    path: '/dataList',
                    component: resolve => require(['@/page/dataStore/dataList'], resolve),
                },
                {
                    name: 'serverApiList',
                    path: '/serverApiList',
                    component: resolve => require(['@/page/serverAPI/serverApiList'], resolve),
                },
                {
                    name: 'instructionsContent',
                    path: '/instructionsContent',
                    component: resolve => require(['@/page/instructions/instructionsContent'], resolve),
                }
            ]
        }
    ]
})
