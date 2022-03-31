<template>
	<div>
		<h2>{{ usuario.id }}'s lista de favoritos</h2>
		<ul>
			<li v-for="compraItem in compraItens" :key="compraItem.id">{{ compraItem.item_id }} / {{ compraItem.item_slug }} / {{ compraItem.usuario }}</li>
		</ul>
		<div class="wish container">
			<div class="card" v-for="item in items" :key="item.id">
				<div class="card-image">
					<img src="@/assets/1.jpg">
				</div>
				<div class="card-content">
					<router-link :to="{ name: 'Detalhe', params: { item_slug: item.slug }}">
						<h3>{{ item.titulo }}</h3>
					</router-link>
					<p class="price">{{ addVirgula(item.preco )}}</p>

					<div class="divider"></div>

					<p class="writer">{{ item.escritor }}</p>
					<p class="cont"> {{ item.conteudo }}</p>

					<ul class="tags">
						<li v-for="(tag, index) in item.tags" :key="index">
							<span class="tag"># {{ tag }}</span>
						</li>
					</ul>
					<p class="date">{{ moment(item.data).format('D.M.Y') }}</p>

					<div class="divider"></div>
					<ul class="icons">
						<li @click="deletarPedidosItem(item.id)"><i class="material-icons">favoritos</i></li>
						<li><router-link :to="{ name: 'Detalhe', params: {item_slug: item.slug }}"><i class="material-icons grey-text">local_grocery_store</i></router-link></li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { db } from '../firebase';
import firebase from 'firebase'
import moment from 'moment'
export default {
	name: 'Favorito',
	data() {
		return {
			moment: moment,
			itens: [],
			listaFavoritos: [],
			usuario: null,
			listaFavorito: null
		}
	},
	methods: {
		addVirgula(num) {
			var regexp = /\B(?=(\d{3})+(?!\d))/g
            return num.toString().replace(regexp, ',')
		},
		deletarPedidosItem(item, listaFavorito) {
			var resultado = confirm('Tem certeza de que deseja removê-lo da sua lista de desejos?')
			if (resultado) {
				db.collection('favoritosItens').where('slug', '==', item.slug).delete()
				.then(() => {
					this.$swal({
						position: 'center',
						type: 'success',
						title: 'Exclusão concluída',
						showConfirmButton: false,
						timer: 1000
					})
					this.itens = this.itens.filter(carrinhoItem => {
						console.log(carrinhoItem);
						return listaFavorito.slug != item.slug
					})
				})
			}
		}
	},
	created() {
		// obter usuario atual
		let refFav = db.collection("usuarios")
		refFav.where('usuario_id','==', firebase.auth().currentUser.uid).get()
		.then(snapshot => {
			snapshot.forEach(doc => {
				this.usuario = doc.data(),
				this.usuario.id = doc.id 
			})
			console.log('obter id usuario atual');
			console.log(this.usuario.id);
		})
		db.collection('favoritosItens').get()
		.then(snapshot => {
			snapshot.forEach(doc => {
				let favoritoItem = doc.data()
				favoritoItem.id = doc.id 

				this.favoritosItens.push(favoritoItem)
			})
		})
	}
}
</script>
<style scoped>
	.wish{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 30px;
  margin-top: 60px;
}

.divider {
  margin: 10px 0;
}
.wish h3{
  font-size: 1.2em;
  margin:0;
  font-weight: bold;
  color: #ff7657;
}
.wish .price{
  font-size: 1.6em;
  margin-top: 10px;  
}

.cont{
    height: 90px;
    padding: 10px 0 0 0;
}
.wish .date{
  color: grey;
  text-align: right;
}
.wish .colors{
  margin: 30px auto;
}

.wish .colors li{
  display: inline-block;
}

.wish ul{
  margin: 0;
}
.wish .tags {
  margin: 10px 0;
}
.wish .tags li{
  display: inline-block;
  margin-right: 10px;
}
.wish .tags li:hover{
  color: #ff7657;
  cursor: pointer;
  text-decoration: underline;
}

.wish .icons li{
  display: inline-block;
  cursor: pointer;
  padding :5px 10px 10px 10px;
  float: right;
}
.wish .delete{
  position:absolute;
  top:4px;
  right: 4px;
  cursor: pointer;
  color: #aaa;
  font-size: 1.4em;
}
</style>