<template>
  <div class="container main">
    <div class="search">
      <div class="searching_box input-field col s6">
          <input id="icon_prefix" type="text" class="validate" placeholder="Pesquisar...">
           <i class="clear material-icons grey-text">Fechar</i>
      </div>
    </div>
    <h2>Item Lista</h2>
    <p class="item_quantity">Arma de fogo <span></span>produtos para cães</p>
    <div class="sort_ed">
      <div class="sort">
        <a href="#">último pedido</a>
        <a href="">ordem por preço</a>
      </div>
      <div class="edit_delete">
        <a href="#">Editar</a>
        <a href="#">Deletar</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
	name: 'Index'
}
</script>

<style>

.main{
  position: relative;
}
.search{
    width: 25%;
    position: absolute;
    top:0;
    right: 0;
}
.clear{
  cursor: pointer;
  position: absolute;
  top: 15px;
  right: 5px;
}
.searching_box{
    margin: 0;
}
.searching_box i{
    float:right;
}
.sort_ed{
  overflow:hidden;
}
.sort{
  float: left;
  text-align: center;
  height: 44px;
  line-height: 44px;
}

.sort a{
  color:#666;
  margin: 0 5px;
}
.edit_delete{
  float:right;

}
.edit_delete a{
  display: inline-block;
  border: 1px solid #eee;
  border-radius: 10px;
  padding:5px 10px;
  margin: 5px 5px;
  color:#666;
  font-weight: bold;
}

a:hover{
 color: #ff7657;
}

h2{
  color: #ff7657;
  font-size: 1.8em;
  font-weight: bold;
  text-align: center;
}
.item_quantity{
  text-align: center;
}
.item_quantity span{
  font-weight: bold;
}
.index{
  border-top: 2px solid #ccc;
  padding-top:20px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 10px;
}

.divider {
    margin: 10px 0;
}
.index h3{
  font-size: 1.2em;
  margin:0;
  font-weight: bold;
  color: #ff7657;
}
.index .price{
    font-size: 1.6em;
    margin-top: 10px;  
}

.cont{
    height: 90px;
    padding: 10px 0 0 0;
}
.index .date{
    color: grey;
    text-align: right;
}
.index .colors{
  margin: 30px auto;
}

.index .colors li{
  display: inline-block;
}

.index ul{
  margin: 0;
}
.index .tags {
    margin: 10px 0;
}
.index .tags li{
  display: inline-block;
  margin-right: 10px;
}
.index .tags li:hover{
  color: #ff7657;
  cursor: pointer;
  text-decoration: underline;
}
.index .right_icon{
  float: right;
}
.index .left_icon li{
  display: inline-block;
  cursor: pointer;
  padding :5px 10px 10px 10px;
}
.index .left_icon{
  float: left;
}

.index .right_icon li{
    display: inline-block;
    cursor: pointer;
    padding :5px 10px 10px 10px;
    float: right;
}


.index .delete{
  cursor: pointer;
  color: #aaa;
}
</style>