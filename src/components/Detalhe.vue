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
			</div>
		</div>
	</div>
</template>
<script>
import { db } from '../firebase';
import firebase from 'firebase'
export default {
	name: 'Detalhe',
	data() {
		return {
			item: null
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
		db.collection('usuarios').where('usuario_id', '==', firebase.auth().currentUser.uid).get()
		.then(snapshot => {
			snapshot.forEach(doc => {
				this.user = doc.data(),
				this.user.id = doc.id 
			})
			console.log('obter id usuário atual');
			console.log(this.user.id);
		})
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