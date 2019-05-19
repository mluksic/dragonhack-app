import Vue from 'vue';
import Router from 'vue-router';
import Dashboard from './views/Dashboard.vue';
import Campaigns from './views/Campaigns.vue';
import Detail from './views/Detail.vue';
import Report from './views/Report.vue';
import Login from './views/Login.vue';

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'dashboard',
            component: Dashboard
        },
        {
            path: '/campaigns',
            name: 'campaigns',
            component: Campaigns
        },
        {
            path: '/report',
            name: 'report',
            component: Report
        },
        {
            path: '/detail',
            name: 'detail',
            component: Detail
        },
        {
            path: '/Login',
            name: 'Login',
            component: Login
        }
    ]
});
