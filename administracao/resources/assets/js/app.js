require('./bootstrap');

window.Vue = require('vue');

import VueRouter from 'vue-router';
import VueSocketio from 'vue-socket.io';

Vue.use(VueRouter);
Vue.use(VueSocketio, 'http://192.168.10.10:8080');

const user = Vue.component('user', require('./components/user.vue'));
const img = Vue.component('img', require('./components/image.vue'));
const estatisticas = Vue.component('image', require('./components/estatisticas.vue'));
const userGameEdit = Vue.component('userGameEdit', require('./components/userGameEdit.vue'))
const login = Vue.component('login', require('./components/login.vue'));
const passoword = Vue.component('passoword', require('./components/changePassword.vue'));
const email = Vue.component('email', require('./components/email.vue'));

const routes = [

    { path: '/', redirect: '/login' },
    { path: '/images', component: img },
    { path: '/users', component: user },
    { path: '/estatisticas', component: estatisticas },
    { path: '/userlogin', component: userGameEdit},
    { path: '/login', component: login},
    { path: '/password', component: passoword},
    { path: '/email', component: email},

];
const router = new VueRouter({
    routes:routes
});

const app = new Vue({
    router,
    data: {
    },
    el: '#app',
}).$mount('#app');

