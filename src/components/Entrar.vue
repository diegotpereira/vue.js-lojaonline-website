<template>
	<div class="login container">
		<form @submit.prevent="entrar" class="card-panel">
			<h2 class="center">Entrar</h2>
			<div class="field">
				<label for="email">Email:</label>
				<input type="email" name="email" v-model="email">
			</div>
			<div class="field">
				<label for="senha">Senha:</label>
				<input type="password" name="password" v-model="password">
			</div>
			<p v-if="feedback" class="red-text center">{{ feedback }}</p>
			<div class="field center btn-field">
				<button class="btn waves-effect waves-light deep-orange lighten-1">Entrar</button>
			</div>
		</form>
	</div>
</template>
<script>
//import firebase from 'firebase'
import firebase from '../firebase'

export default {
	name: 'Entrar',
	data() {
		return {
			email: null,
			password: null,
			feedback: null
		}
	},
	methods: {
		entrar() {
			if (this.email && this.password) {
				firebase.auth().signInWithEmailAndPassword(this.email, this.password)
				.then(cred => {
					this.$router.push({name: 'Index'})
					console.log(cred);
				}).catch(err => {
					this.feedback = err.message
				})
				this.feedback = null 
			} else {
				this.feedback = 'Por favor, digite seu ID e senha.'
			}
		}
	}
}
</script>
<style lang="">
	
</style>