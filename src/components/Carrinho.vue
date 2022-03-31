<template>
	<div class="cart container">
		<h2 @click="verificarItens"> {{ usuario.id }}'s Carrinho</h2>
		<p class="item_quantity">sua lista tem <span>{{ carrinhoItens.length }}</span> de itens.</p>

		<table class="cart_table">
			<tr class="table title">
				<th v-for="coluna in colunas" :key="coluna.index"> {{ coluna }}</th>
				<th>　　</th>
			</tr>

			<tr class="table_value" v-for="carrinhoItem in carrinhoItens" :key="carrinhoItem.id">
				<td>{{ carrinhoItem.id }}</td>
				<td>{{ carrinhoItem.usuario }}</td>
				<td>{{ carrinhoItem.produto_id }}</td>
				<td>{{ carrinhoItem.titulo }}</td>
				<td>{{ carrinhoItem.cor }}</td>
				<td>{{ carrinhoItem.tamanho }}</td>
				<td>{{ addVirgula(carrinhoItem.preco) }}</td>
				<td>{{ carrinhoItem.quantidade }}</td>
				<td>{{ addVirgula(carrinhoItem.total)}} </td>
				<td><i class="material-icons delete_btn" @click="deletarCarrinhoItem(carrinhoItem.id)">Limpar</i></td>
			</tr>
		</table>

		<div class="result">
			<table>
				<tr>
					<th>quantidade total</th>
					<td>{{ quantidadeSomar() }}</td>
				</tr>
				<tr>
					<th>A quantidade total</th>
					<td>{{ addVirgula(precoSomar()) }}</td>
				</tr>
			</table>
		</div>
	</div>
</template>
<script>
import { db } from '../firebase';
import firebase from 'firebase'
import moment from 'moment'
export default {
	name: 'carrinho',
	data() {
		return {
			moment: moment,
			colunas: ['Não', 'Usuario', 'Produto ID', 'Titulo', 'Cor', 'Tamanho', 'Preço', 'Quantidade','Total'],
			carrinhoItens: [],
			usuario: null,
			combinarItens: []
		}
	},
	created() {
		db.collection('carrinhoItens').get()
		.then(snapshot => {
			snapshot.forEach(doc => {

				let carrinhoItem = doc.data()
				carrinhoItem.id = doc.id 

				this.carrinhoItens.push(carrinhoItem)
			})
			console.table(this.carrinhoItens)
		})
		//obter usuario atual 
		console.log('atual uid', firebase.auth().currentUser.uid);
		//db.collection('usuarios').where('usuario_id', '==', firebase.auth().currentUser.uid).get()
		let refNom = db.collection("usuarios")
		refNom.where('usuario_id','==', firebase.auth().currentUser.uid).get()
		.then(snapshot => {
			snapshot.forEach(doc => {
				this.usuario = doc.data(),
				this.usuario.id = doc.id 
			})
		})
	},
	methods: {
		precoSomar() {
			return this.carrinhoItens.reduce((prev, cur) => prev + cur.total, 0)
		},
		quantidadeSomar() {
			return this.carrinhoItens.reduce((prev, cur) => prev + cur.quantidade, 0)
		},
		verificarItens() {
			for(var index = 0; index <= this.carrinhoItens.length; index++) {
				if (this.carrinhoItem.usuario == this.usuario.alias) {
					this.combinarItens.push(this.carrinhoItem)
					console.log(this.combinarItens);
				}
			}
		},
		addVirgula(num) {
			var regexp = /\B(?=(\d{3})+(?!\d))/g
            return num.toString().replace(regexp, ',')
		},
		deletarCarrinhoItem(id) {

			var resultado = confirm('Tem certeza de que deseja removê-lo da lista do carrinho de compras?')

			if (resultado) {
				db.collection('carrinhoItens').doc(id).delete() 
				.then(() => {
					this.$swal({
						position: 'center',
						type: 'success',
						title: 'Exclusão concluída',
						showConfirmButton: false,
						timer: 1000
					})
					this.carrinhoItens = this.carrinhoItens.filter(carrinhoItem => {

						return carrinhoItem.id != id 
					})
				})
			}
		}
	}
}
</script>
<style>

table th, td{
    text-align: center;
}

.delete_btn{
    cursor: pointer;
}

.result{
  margin-top: 40px;
  width: 50%;
  float: right;
}
	
</style>