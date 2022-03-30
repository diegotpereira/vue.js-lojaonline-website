<template>
	<div class="detail">
		<div class="item" v-if="item">
			<div class="item-image">
				<img src="@/assets/1.jpg" alt="">
			</div>

			<div class="item-content">
				<div class="title_writer">
					<h3 class="grey-text"> {{ item.titulo }}</h3>
					<p class="writer">por. {{ item.escritor }}</p>
				</div>
				<div class="price_date">
					<p class="price">{{ addVirgula(item.preco) }}</p>
					<p class="date">{{ moment(item.data).format('D, M, Y') }}</p>
				</div>
				<div class="divider"></div>

				<div class="color_pick" v-show="item.cor">
					<h4 class="sub_title">Cor</h4>
					<p v-show="item.cores.includes('Red')">
						<label for="">
							<input type="radio" name="cor" value="Red" />
							<span>Red</span>
						</label>
					</p>
					<p v-show="item.cores.includes('Yellow')">
						<label for="">
							<input type="radio" name="cor" value="Yellow" />
							<span>Amarelo</span>
						</label>
					</p>
					<p v-show="item.cores.includes('Green')">
						<label for="">
							<input type="radio" name="cor" value="Green" />
							<span>Verde</span>
						</label>
					</p>
					<p v-show="item.cores.includes('White')">
						<label for="">
							<input type="radio" name="cor" value="White" />
							<span>Branco</span>
						</label>
					</p>
					<p v-show="item.cores.includes('Black')">
						<label for="">
							<input type="radio" name="cor" value="Black" />
							<span>Preto</span>
						</label>
					</p>
				</div>

				<div class="size_pick">
					<h4 class="sub_title">Tamanho</h4>
					<p>
						<label for="">
							<input type="radio" name="tamanho" value="S" />
						</label>
					</p>
					<p>
						<label for="">
							<input type="radio" name="tamanho" value="M" />
						</label>
					</p>
					<p>
						<label for="">
							<input type="radio" name="tamanho" value="L" />
						</label>
					</p>
				</div>
				<div class="quantity_pick">
					<h4 class="sub_title">Quantidade</h4>
					<div class="quantity_box">
						<i class="material-icons" @click="subtrairQuantidade">remover</i>
						<span class="quantity_value">{{ quantidadeNumero }}</span>
						<i class="material-icons" @click="addQuantidade">add</i>
					</div>
					<p class="red-text" v-if="feedback"></p>
					<a class="waves-effect waves-light btn deep-orange lighten-1 adding_btn" @click="adicionandoLista">adicionar</a>
					<!--listando itens-->
					<div class="listing" v-if="listando_item">
						<div class="divider"></div>
						<table class="detail_table">
							<tr class="table title">
								<th>Cor</th>
								<th>Tamanho</th>
								<th>Quantidade</th>
								<th>Total</th>
							</tr>
							<tr class="table_value">
								<td>{{ corValor }}</td>
								<td>{{ tamanhoValor }}</td>
								<td>{{ quantidadeValor }}</td>
								<td>{{ addVirgula(total) }}</td>
							</tr>
						</table>
						<p class="listing_reset" @click="resetarLista">Redefinir seleção</p>
						<p class="hide">{{ item.id }}</p>
					</div>
					<div class="icons">
						<a href="" class="waves-effect waves-light btn deep-orange lighten-1" @click="addCarrinho">Adicionar ao carrinho</a>
					</div>
				</div>
			</div>
			<div class="description">
				<div class="divider"></div>
				<h4 class="sub_title">Descrição</h4>
				<p class="cont">{{ item.conteudo }}</p>

				<ul class="tags">
					<li v-for="(tag, index) in item.tags" :key="index">
						<span class="tag">#{{tag }}</span>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
import { db } from '../firebase';
import firebase from 'firebase'
import moment from 'moment'
export default {
	name: 'Detalhe',
	data() {
		return {
			moment: moment,
			item: null,
			quantidadeNumero: 0,
			listando_item: false,
			corValor: null,
			tamanhoValor: null,
			quantidadeValor: null,
			total: null,
			feedback: null
		}
	},
	created() {
		let ref = db.collection('items').where('slug', '==', this.$route.params.item_slug)
		ref.get().then(snapshot => {
			console.log('coleção de itens chamada where slug!');
			snapshot.forEach(doc => {
				this.item = doc.data()
				this.item.id = doc.id 
			})
			console.log(this.item);
		})
		// obter usuario atual
		let usuario = firebase.auth().currentUser
		db.collection('usuarios').where('usuario_id', '==', usuario).get()
		.then(snapshot => {
			snapshot.forEach(doc => {
				this.user = doc.data(),
				this.user.id = doc.id 
			})
			console.log('obter id usuário atual');
			//console.log(this.user.id);
		})
	},
	methods: {
		addVirgula(num) {
			var regexp = /\B(?=(\d{3})+(?!\d))/g

			return num.toString().replace(regexp, ',')
		},
		addQuantidade() {
			if (this.quantidadeNumero >= 0) {
				this.quantidadeNumero++
			}
		},
		subtrairQuantidade() {
			if (this.quantidadeNumero > 0) {
				this.quantidadeNumero--
			}
		},
		adicionandoLista() {
			//obter valor da cor
        var cores = document.getElementsByName('cor')
        var corValor 
		console.log(corValor);
			for(var index = 0; index < cores.length; index++) {
				if (cores[index].checked) {
					this.corValor = cores[index].value
				}
			}
			//obter valor tamanho 
			var tamanhos = document.getElementsByName('tamanho')
			var tamanhoValor 
			console.log(tamanhoValor);
			for(var j = 0; j < tamanhos.length; j++) {
				if (tamanhos[j].checked) {
					this.tamanhoValor = tamanhos[j].value 
				}
			}
			//obter valor da quantidade 
			this.quantidadeValor = this.quantidadeNumero 

			if (this.corValor && this.tamanhoValor && this.quantidadeValor) {
				this.listando_item = true
				this.feedback = null 
				this.total = this.item.preco * this.quantidadeValor

			} else {
				this.feedback = 'Selecione a cor, tamanho e quantidade desejados.'
			}
		},
		resetarLista() {
			this.feedback = null
			this.corValor = null
			this.tamanhoValor = null
			this.quantidadeValor = null 
			this.total = null 
			this.quantidadeNumero = null 
			this.listando_item = null 
		},
		addCarrinho() {
			if (this.listando_item) {
				this.feedback = null 

				db.collection('carrinhoItens').add({
					titulo: this.item.titulo,
					preco: this.item.preco,
					produto_id: this.item.id,
					cor: this.corValor,
					tamanho: this.tamanhoValor,
					quantidade: this.quantidadeValor,
					total: this.total,
					user: this.user.id
				})
				.then(() => {
					this.$swal({
						position: 'center',
						type: 'sucess',
						title: 'Concluir Adicionar ao Carrinho',
						showConfirmButton: false,
						timer: 1000
					})
					this.$router.push({ name: 'Carrinho'})
				}).catch(err => {
					console.log(err);
				})
			} else {
				this.feedback = 'Falha ao adicionar ao carrinho. Tente novamente por favor!'
			}
		}
	}
}
</script>
<style>

.detail{
    width: 80%;
    margin: 60px auto;
}
.item{
    width: 100%;
    overflow: hidden;
}
.item .item-image img{
    width: 40%;
    float: left;
    margin-top: 50px;
}
.item .item-content{
    width: 60%;
    float: right;
    padding: 0 50px 0 50px;
}
.item .item-content h3{
    font-size: 2em;
    display:inline-block;
    margin:0 20px 5px 0;
}
.writer{
    display:inline-block;
    margin:0 0 5px 0;
    color: #666;
}
.item .item-content h2 span{
    font-size: 1em;
}

.price_date .price{
    font-size: 1.6em;
    font-weight: bold;
    margin: 10px 0 0 0 ;
    width: 50%;
    display: inline-block;
}
.price_date .date{
    text-align: right;
    margin: 0;
    display: inline-block;
    width: 48%;
}
.divider {
    margin: 20px 0;
}
.tags li{
  display: inline-block;
  margin-right: 10px;
}
.tags li:hover{
  color: red;
  cursor: pointer;
  text-decoration: underline;
}
.color_pick span{
    padding-left: 25px;
    font-size: 1.6em;
}
.color_pick {
    margin-bottom: 20px;
}
.color_pick p{
    display: inline-block;
    margin-right: 10px;
}

.size_pick span{
    padding-left: 25px;
    font-size: 1.6em;
}
.size_pick {
    margin-bottom: 20px;
}
.size_pick p{
    display: inline-block;
    margin-right: 10px;
}

.sub_title{
  font-weight: bold;
  color:#ff7657;
  display: block;
  margin-bottom: 10px;
  font-size: 1.1em;
}

.quantity_pick .quantity_box{
    margin-top: 20px;
}
.quantity_pick .quantity_box i{
    cursor: pointer;
}
.quantity_pick .quantity_value{
    border: 1px solid #cacaca; 
    padding: 6px 10px;
    font-size: 1.4em;
    border-radius: 10px;
}

.adding_btn{
    margin-top: 20px;
}

.detail_table{
    width: 80%;
    margin-left:30px;
}
.detail_table th, td{
    text-align: center;
}
.listing{
    overflow: hidden;
}
.listing .listing_reset{
    float: right;
    cursor: pointer;
}
.detail .icons{
    margin: 40px 0;
}
.detail .icons a{
    line-height: 36px;
    text-align: center;
    margin: 0 5px;
}
.detail .icons i{
    margin-top: 2px;
}

.description{
    width: 90%;
    margin:20px auto;
}
	
</style>