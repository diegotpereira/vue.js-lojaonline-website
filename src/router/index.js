import Vue from 'vue'
import Router from 'vue-router'
import Entrar from '../components/Entrar.vue'

import firebase from 'firebase'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [{
        path: '/entrar',
        name: 'Entrar',
        component: Entrar
    }]
})
router.beforeEach((to, from, next) => {
    if (to.matched.some(rec => rec.meta.requiresAuth)) {
        let user = firebase.auth().currentUser
        if (user) {
            next()
        } else {
            next({ name: 'Entrar' })
        }
    } else {
        next()
    }
})

export default router