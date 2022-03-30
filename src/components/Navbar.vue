<template>
	<div class="navbar">
		<nav class="navbox grey darken-3">
			<div class="container">
				<router-link :to="{name: 'Index' }" class="brand-logo center">DTP Software</router-link>
				<ul class="right">
					<li><router-link :to="{name: 'Add'}">Registro de produto</router-link></li>
					<li><router-link :to="{name: 'Carrinho'}"><i class="material-icons white-text">local_grocery_store</i></router-link></li>
					<li v-if="!usuario"><router-link :to="{name: 'Cadastrar'}">Cadastre-se</router-link></li>
					<li v-if="!usuario"><router-link :to="{name: 'Entrar'}">Entrar</router-link></li>
					<li v-if="usuario"><a>{{ usuario.email }}</a></li>
					<li v-if="usuario"><a @click="sair">Sair</a></li>
				</ul>
			</div>
		</nav>
	</div>
</template>
<script>
import firebase from 'firebase'
export default {
	name: 'Navbar',
	data() {
		return {
			usuario: null
		}
	},
	methods: {
		sair() {
			firebase.auth().signOut().then(() => {
				this.$router.push({ name: 'Index'})
			})
		}
	},
	created() {
		firebase.auth().onAuthStateChanged((usuario) => {
			if (usuario) {
				this.usuario = usuario
				console.log(usuario);
			} else {
				this.usuario = null
			}
		})
	}
}
</script>
<style>

.navbar input{
 width: 200px;
 float: right;
  
}
	
</style>