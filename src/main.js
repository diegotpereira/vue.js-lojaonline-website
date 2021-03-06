import Vue from 'vue'
import App from './App.vue'
import router from './router'
import firebase from 'firebase'

Vue.config.productionTip = false

/* sweet alert */
import VueSweetalert2 from 'vue-sweetalert2';
Vue.use(VueSweetalert2);

let app = null;
//new Vue({
//    render: h => h(App),
//    router,
//}).$mount('#app')

firebase.auth().onAuthStateChanged(() => {

    if (!app) {
        app = new Vue({
            el: '#app',
            router,
            components: { App },
            template: '<App/>'
        })
    }

})

//new Vue({
//    router,
//    render: h => h(App)
//}).$mount('#app')