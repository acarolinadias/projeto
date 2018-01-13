require('./bootstrap');

window.Vue = require('vue');

import VueRouter from 'vue-router';
import VueSocketio from 'vue-socket.io';

Vue.use(VueRouter);
Vue.use(VueSocketio, 'http://192.168.10.10:8080');

const userGameEdit = Vue.component('userGameEdit', require('./components/userGameEdit.vue'))
const multiplayerGame = Vue.component('multiplayergame', require('./components/multiplayer.vue'));
const singleplayerGame = Vue.component('singleplayerGame', require('./components/singleplayer.vue'));


const routes = [

    { path: '/', redirect: '/jogo' },
    { path: '/jogo', component: multiplayerGame},


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

