<template>
	<div class="add">
		<div class="add-item container">
			<h2 class="center-align">Editar Item</h2>
			<form @submit.prevent="EditarItem">
				<div class="row">
					<div class="input-field col s8">
						<p class="sub_title">Item Título</p>
						<input type="text" name="titulo" class="validate" v-model="item.titulo">
					</div>
					<div class="input-field col s8">
						<p class="sub_title">Preço</p>
						<input type="text" name="preco" class="validate" v-model="item.preco">
					</div>
					<div class="input-field col s12">
						<p class="sub_title">Descrição</p>
						<textarea id="textarea2" class="materialize-textare" data-length="120" v-model="item.conteudo"></textarea>
					</div>
				</div>
				<div class="row">
					<p class="sub_title">Tag </p>
					<div class="col s4">
						<input type="text" name="tag" v-model="item.tags[0]">
						<label for="tag">Tag 1</label>
					</div>
					<div class="col s4">
						<input type="text" name="tag" v-model="item.tags[1]">
						<label for="tag">Tag 2</label>
					</div>
					<div class="col s4">
						<input type="text" name="tag" v-model="item.tags[2]">
						<label for="tag">Tag 3</label>
					</div>
				</div>

				<div class="divider"></div>

				<div class="color_pick">
					<p class="sub_title">Cor</p>
					<p>
						<label>
							<input type="checkbox" name="cor" value="Red" v-model="item.cores" />
							<span>Vermelho</span>
						</label>
					</p>
					<p>
						<label>
							<input type="checkbox" name="cor" value="Yellow" v-model="item.cores" />
							<span>Amarelo</span>
						</label>
					</p>
					<p>
						<label>
							<input type="checkbox" name="cor" value="Green" v-model="item.cores" />
							<span>Verde</span>
						</label>
					</p>
					<p>
						<label>
							<input type="checkbox" name="cor" value="White" v-model="item.cores" />
							<span>Branco</span>
						</label>
					</p>
					<p>
						<label>
							<input type="checkbox" name="cor" value="Black" v-model="item.cores" />
							<span>Preto</span>
						</label>
					</p>
				</div>
				<div class="divider"></div>

				<div class="row quantity">
					<p class="sub_title">Tamanho</p>
					<div class="col s4">
						<p>S</p>
						<div class="input-field inline">
							<input type="text" v-model="item.S">
						</div>
					</div>
					<div class="col s4">
						<p>M</p>
						<div class="input-field inline">
							<input type="text" v-model="item.M">
						</div>
					</div>
					<div class="col s4">
						<p>L</p>
						<div class="input-field inline">
							<input type="text" v-model="item.L">
						</div>
					</div>
				</div>
				<div class="field center-align btn_box">
					<p class="red-text" v-if="feedback">{{ feedback }}</p>
					<button class="btn waves-effect waves-light deep-orange lighten-1">Atualizar Item</button>
				</div>
			</form>
		</div>
	</div>
</template>
<script>
import { db } from '../firebase';
//import firebase from 'firebase'
import slugify from 'slugify'
export default {
	name: 'Editar',
	data() {
		return {
			item: null,
			feedback: null
		}
	},
	methods: {
		EditarItem() {
			if (this.item.titulo && this.item.preco && this.item.conteudo) {
				this.feedback = null 

				this.item.slug = slugify(this.item.titulo, {
					replacement: '-',
					remove: /[$*_+~.()'"!\-:@]/g,
					lower: true 
				})
				console.log(this.item.slug);

				db.collection('items').doc(this.item.id).update({
					titulo: this.item.titulo,
					preco: this.item.preco,
					conteudo: this.item.conteudo,
					tagas: this.item.tags,
					cores: this.item.cores,
					S: this.item.S,
					M: this.item.M,
					L: this.item.L,
					slug: this.item.slug,
					favorito: false 
				})
				.then(() => {
					this.$swal({
						position: 'center',
						type: 'success',
						title: 'Modificações concluídas',
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
	},
	created() {
		let refItem = db.collection('itens').where('slug', '==', this.$route.params.item_slug)
		refItem.get().then(snapshot => {
			snapshot.forEach(doc => {
				this.item = doc.data(),
				this.item.id = doc.id
			})
		})
	}
}
</script>
<style scoped>
.add{
  width: 70%;
  margin:0 auto;
}
.add h2{
  color: #ff7657;
  font-size: 1.8em;
  font-weight: bold;
}
.sub_title{
  font-weight: bold;
  color: #ff7657;
}
.divider{
  margin: 40px auto;
}

.btn_box{
  margin-bottom: 40px;
}

</style>