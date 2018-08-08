import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '../components/HelloWorld'
import NewsLists from '../components/NewsLists'
import HedaWeb from '../components/hedaweb'
import UITest from '../components/UITest'
import Login from '../components/login'

Vue.use(Router)

export default new Router({
    routes: [
        // {
        //     path: '/',
        //     name: 'login',
        //     redirect: '/login',
        //     component: Login,
        // }, 
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/HelloWorld',
            name: 'HelloWorld',
            component: HelloWorld
        },
        {
            path: '/NewsLists',
            name: 'NewsLists',
            component: NewsLists
        },
        {
            path: '/hedaweb',
            name: 'hedaweb',
            component: HedaWeb
        },
        {
            path: '/UITest',
            name: 'UITest',
            component: UITest
        },
        // {
        //     path: '/register',
        //     component: register
        // },
        // {
        //     path: '/index.html',
        //     component: appstart
        // },
        // {
        //     path: '*',
        //     component: NotFoundComponent
        // }

    ]
})