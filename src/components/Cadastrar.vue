<template>
	<div class="signup container">
		<form @submit.prevent="inscrever" class="card-panel">
			<h2 class="center">Cadastrar</h2>
			<div class="field">
				<label for="email">Email</label>
				<input type="email" name="email" v-model="email">
			</div>
			<div class="field">
				<label for="password">Senha:</label>
				<input type="password" name="password" v-model="password">
			</div>
			<div class="field">
				<label for="usuarionome">Usuário Nome:</label>
				<input type="text" name="usuarionome" v-model="usuarionome">
			</div>
			<p class="red-text center" v-if="feedback"> {{ feedback }}</p>
			<div class="field center">
				<button class="btn waves-effect waves-light deep-orange lighten-1">Cadastrar</button>
			</div>
		</form>
	</div>
</template>
<script>
import slugify from 'slugify'
//import firebase from '../firebase'
import * as firebase from "../firebase";

export default {
	name: 'Cadastrar',
	data() {
		return {
			email: null,
			password: null,
			usuarionome: null,
			feedback: null,
			slug: null
		}
	},
	methods: {
		inscrever() {
			if (this.usuarionome && this.email && this.password) {
				this.slug = slugify(this.usuarionome, {
					replacement: '-',
					remove: /[$*_+~.()'"!\-:@]/g,
					lower: true
				})

				let ref = firebase.usuarioColecao.doc(this.slug)
				ref.get().then(doc => {
					if (doc.exists) {
						this.feedback = 'Nome de usuário já foi usado.'
					} else {
						firebase.auth.createUserWithEmailAndPassword(this.email, this.password)
						.then(cred => {
							ref.set({
								usuarionome: this.usuarionome,
								usuario_id: cred.user.uid
							})
						})
						.then(() => {
							this.$router.push({name: 'Index'})
						})
						.catch(err => {
							console.log(err)
							this.feedback = err.message 
						})
						this.feedback = 'Registrando. Por favor, aguarde'
						this.$swal({
							position: 'center',
							type: 'success',
							title: 'Parabéns por se tornar um membro.',
							showConfirmButton: false,
							timer: 2000
						})
					}
				})
			} else {
				this.feedback = 'Insira um nome de usuário valido.'
			}
		}
	}
}
</script>
<style>

.signup{
    max-width: 400px;
    margin-top: 60px;
}

.signup .field{
    margin-bottom: 16px;
}
	
</style>