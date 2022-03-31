<template>
	<div class="comment">
		<div class="divider"></div>
		<h4 class="sub_title">comentarios <span>({{comentarios.length}})</span></h4>
		<div class="show_comment" v-for="(comente, index) in comentarios" :key="index">
			<p class="from">{{comente.de}}</p>
			<p class="timestamp">{{moment(comente.hora).fromNow()}}</p>
			<p class="content">{{comente.conteudo}}</p>
			<div class="divider"></div>
		</div>
		<div class="add_comment">
			<form @keyup.enter="addComentario">
				<div>
					<label for="comment">Adicionar Comentário</label>
					<textarea id="textarea2" class="materialize-textarea" data-length="120" v-model="novoComentario"></textarea>
					<p class="red-text center" v-if="feedback">{{ feedback }}</p>
				</div>
				<div class="field center-align btn_box">
					<button class="btn waves-effect waves-light deep-orange lighten-1" @click="addComentario">Adicionar Comentário</button>
				</div>
			</form>
		</div>
	</div>
</template>
<script>
import { db } from '../firebase';
import firebase from 'firebase'
//import slugify from 'slugify'
import moment from 'moment'
export default {
	name: 'comentario',
	data() {
		return {
			moment: moment,
			novoComentario: null,
			feedback: null,
			usuario: null,
			comentarios: []
		}
	},
	created() {
		let refComent = db.collection("usuarios")
		refComent.where('usuario_id','==', firebase.auth().currentUser.uid).get()
		.then(snapshot => {
			snapshot.forEach(doc => {
				this.usuario = doc.data(),
				this.usuario.id = doc.id
			})
			console.log('obter id usuário atual');
		})
		//obter dados comentários
		db.collection('comentarios').where('para', '==', this.$route.params.item_slug)
		.onSnapshot((snapshot) => {
			snapshot.docChanges().forEach(change => {
				if(change.type == 'adicionado') {
					this.comentarios.unshift({
						de: change.doc.data().de,
						conteudo: change.doc.data().conteudo,
						hora: change.doc.data().hora
					})
				}
			})
		})
		.then(snapshot => {
			snapshot.forEach(doc => {
				this.comentarios = doc.data(),
				this.comente.id = doc.id
			})
			console.log('obter dados comentários');
		})
	},
	methods: {
		addComentario() {
			if (this.novoComentario) {
				this.feedback = null 
				db.collection('comentarios').add({
					para: this.$route.params.item_slug,
					de: this.usuario.id,
					conteudo: this.novoComentario,
					hora: Date.now() 
				})
				.then(() => {
					this.novoComentario = null
					console.log('sucesso!!');
				})
			} else {
				this.feedback = 'Por favor, insira seus comentários.'
			}
		}
	}
}
</script>
<style scoped>
.comment{
    margin-top: 60px;
}
.sub_title{
  font-weight: bold;
  color:#ff7657;
  display: block;
  margin-bottom: 10px;
  font-size: 1.1em;
}
.sub_title span{
    font-size: 0.9em;
}
.show_comment{
    width: 95%;
    margin: 0 auto;
}
.show_comment p{
    display:inline-block;
}
.show_comment .from{
    font-size: 1.1em;
     color:#ff765d;
}
.show_comment .timestamp{
    font-size: 0.8em;
    color: grey;
}
.show_comment .content{
    display:block;
    padding-left: 10px;
    margin-top: 0;
}

.add_comment{
    margin-top: 30px;
}
.add_comment form{
    width: 80%;
    margin:0 auto;
}

.add_comment form button{
    margin-top:20px;
}
	
</style>