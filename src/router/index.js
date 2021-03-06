import Vue from 'vue'
import Router from 'vue-router'
import Entrar from '../components/Entrar.vue'
import Index from '../components/Index.vue'
import Cadastrar from '../components/Cadastrar.vue'
import firebase from 'firebase'
import Add from '../components/Add.vue'
import Detalhe from '../components/Detalhe.vue'
import Carrinho from '../components/Carrinho.vue'
import Favorito from '../components/Favorito.vue'
import Editar from '../components/Editar.vue'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [{
            path: '/entrar',
            name: 'Entrar',
            component: Entrar
        },
        {
            path: '/cadastrar',
            name: 'Cadastrar',
            component: Cadastrar
        },
        {
            path: '/',
            name: 'Index',
            component: Index
        },
        {
            path: '/add',
            name: 'Add',
            component: Add
        },
        {
            path: '/:item_slug',
            name: 'Detalhe',
            component: Detalhe
        },
        {
            path: '/carrinho',
            name: 'Carrinho',
            component: Carrinho
        },
        {
            path: '/favorito',
            name: 'Favorito',
            component: Favorito
        },
        {
            path: '/edit/:item_slug',
            name: 'Editar',
            component: Editar
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