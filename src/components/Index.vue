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

</style>