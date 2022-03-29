<template>
	<div class="navbar">
		<div class="navbox grey darken-3">
			<div class="container">
				<router-link :to="{name: 'Index' }" class="brand-logo left">DTP Software</router-link>
				<ul class="right">
					<li><router-link :to="{name: '#'}">Registo de produto</router-link></li>
					<li><router-link :to="{name: '#'}"><i class="material-icons white-text">local_grocery_store</i></router-link></li>
					<li v-if="!usuario"><router-link :to="{name: 'Cadastrar'}">Cadastre-se</router-link></li>
					<li v-if="!usuario"><router-link :to="{name: 'Entrar'}">Entrar</router-link></li>
					<li v-if="usuario"><a>{{ usuario.email }}</a></li>
					<li v-if="usuario"><a @click="sair">Sair</a></li>
				</ul>
			</div>
		</div>
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