import Vue from 'vue'
import Router from 'vue-router'
import Entrar from '../components/Entrar.vue'
import Index from '../components/Index.vue'

import firebase from 'firebase'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [{
            path: '/entrar',
            name: 'Entrar',
            component: Entrar
        },
        {
            path: '/',
            name: 'Index',
            component: Index
        }
    ]
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