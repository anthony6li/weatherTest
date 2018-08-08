// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css'
// import api from '../static/index.js'


Vue.use(ElementUI) // 引用API文件

var axiosConfig = {
    baseURL: "",
    url: '',
    datatype: 'jsonp',
    responseType: 'text',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        // 'Access-Control-Allow-Origin': '*',
        // 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    }
    //headers : window.appConfig.access_token
}

// Vue.prototype.$ajax = axios
var instance = axios.create(axiosConfig)
Vue.prototype.$http = instance;
// 将API方法绑定到全局
// Vue.prototype.$api = api

Vue.config.productionTip = false

instance.interceptors.request.use( //拦截器
    config => {
        // config.headers.push({
        //     'key': "208fbf1ef38641a7a2ae6a78b",
        // });
        config.baseURL = '';
        if (config.url.startsWith('newrank')) {
            config.headers['key'] = '208fbf1ef38641a7a2ae6a78b';
            console.log("拦截器 newrank Key" + config.headers['key']);
        } else if (config.url.startsWith('heda')) {
            console.log('heda log');
            config.baseURL = "http://localhost:43399/";
        }

        console.log("拦截器Log，config：");
        console.log(config);
        return config;
    },
    err => {
        return Promise.reject(err)
    }
)

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>',
    render: h => h(App)
})