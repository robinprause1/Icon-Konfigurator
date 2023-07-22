import { createApp } from 'vue'
import axios from 'axios';
import App from './App.vue'
import router from './router';
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import { createStore } from 'vuex';
import { auth } from './store/auth.module.js';
import { icon } from './store/icon.module.js';
import { message } from './store/message.module';
import { validate } from 'vee-validate';
import $ from 'jquery'


export const store = createStore({
    modules: {
        auth,
        icon,
        message
    }
});

export const app = createApp(App);
app.config.globalProperties.$axios = axios;
app.use(validate);
app.use(store);
app.use(router);
app.use($);
app.mount('#app');
