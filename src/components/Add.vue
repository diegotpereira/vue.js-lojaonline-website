<template>
	<div class="add">
		<div class="add-item container">
			<h2 class="center-align">Adicionar Item</h2>
			<form @submit.prevent="AddItem">
				<div class="row">
					<div class="input-field col s8">
						<p class="sub_title">Item Titulo</p>
						<input type="text" name="titulo" class="validate" v-model="titulo">
					</div>
					<div class="input-field col s8">
						<p class="sub-title">Preço</p>
						<input type="text" name="preco" v-model="preco">
					</div>
					<div class="input-field col s12">
						<p class="sub-title">Descrição</p>
						<textarea id="textarea2" class="materialize-textarea" data-length="120" v-model="conteudo"></textarea>
					</div>
				</div>
				<div class="row">
					<p class="sub_title">Tag</p>
					<div class="col s4">
						<input type="text" name="tag" v-model="tags[0]">
						<label for="tag">Tag 1</label>
					</div>
					<div class="col s4">
						<input type="text" name="tag" v-model="tags[1]">
						<label for="tag">Tag 2</label>
					</div>
					<div class="col s4">
						<input type="text" name="tag" v-model="tags[2]">
						<label for="tag">Tag 3</label>
					</div>
				</div>
				<div class="divider"></div>
				<div class="color-Pick">
					<p class="sub_title">Cor</p>
					<p>
						<label>
							<input type="checkbox" name="cor" value="Red" v-model="cores" />
							<span>Vermelho</span>
						</label>
					</p>
					<p>
						<label>
							<input type="checkbox" name="cor" value="Yellow" v-model="cores" />
							<span>Amarelo</span>
						</label>
					</p>
					<p>
						<label>
							<input type="checkbox" name="cor" value="Green" v-model="cores" />
							<span>Verde</span>
						</label>
					</p>
					<p>
						<label>
							<input type="checkbox" name="cor" value="White" v-model="cores" />
							<span>Branco</span>
						</label>
					</p>
					<p>
						<label>
							<input type="checkbox" name="cor" value="Black" v-model="cores" />
							<span>Preto</span>
						</label>
					</p>
				</div>
				<div class="divider"></div>
					<div class="row quantity">
						<p class="sub_title">Tamanho</p>
						<div class="col s4">
							S
        <div class="input-field inline">
        <input type="text" name="" id="" v-model="S">
          </div>
						</div>
          <div class="col s4">
							M
            <div class="input-field inline">
              <input type="text" name="" id="" v-model="M">
            </div>
          </div>
          <div class="col s4">
							L
            <div class="input-field inline">
              <input type="text" name="" id="" v-model="L">
            </div>
						</div>
					</div>
					<div class="field center-align btn_box">
						<p v-if="feedback" class="red-text">{{ feedback }}</p>
						<button class="btn waves-effect waves-light deep-orange lighten-1">Adicionar</button>
					</div>
			</form>
		</div>
	</div>
</template>
<script>
import slugify from 'slugify'
import { db } from '../firebase';
import firebase from 'firebase'
export default {
	name: 'Add',
	data() {
		return {
			titulo: null,
			preco: null,
			conteudo: null,
			tags: [],
			feedback: null,
			usuarionome: null,
			cores: [],
			S: null,
			M: null,
			L: null,
			wish: false,
			escritor: null,
			user: null,
			id: null
		}
	},
	created(){
		let usuario = firebase.auth().currentUser
		var ref = db.collection("usuarios")
		ref.where('usuario_id','==', usuario).get()
		.then(snapshot=>{
			snapshot.forEach(doc => {
				this.user =doc.data(),
				this.user.id = doc.id
			})
			console.log('get current user id')
		})
	},
	methods: {
		AddItem() {
			if (this.titulo && this.preco && this.conteudo) {
				this.feedback = null
				this.slug = slugify(this.titulo, {
					replacement: '-',
					remove: /[$*_+~.()'"!\-:@]/g,
					lower: true
				})
				console.log(this.slug)
				
				db.collection('items').add({
					titulo: this.titulo,
					preco: this.preco,
					conteudo: this.conteudo,
					tags: this.tags,
					cores: this.cores,
					S: this.S,
					M: this.M,
					L: this.L,
					data: Date.now(),
					usuarionome: this.usuarionome,
					escritor: null
					
				}).then(() => {
					this.$swal({
						position: 'center',
						type: 'success',
						title: 'Registro do produto concluído',
						showConfirmButton: false,
						timer: 1000
					})
					this.$router.push({ name: 'Index'})
				}).catch(err => {
					console.log(err);
				})
			} else {
				this.feedback = 'Insira as informações do produto!'
			}
		}
	}
}
</script>
<style>
	
</style>