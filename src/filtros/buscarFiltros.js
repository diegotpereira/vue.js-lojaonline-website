export default {
    computed: {
        filtrarItens: function() {
            return this.itens.filter((item) => {

                if (item.titulo.match(this.buscar_dado)) {

                    return item.titulo.match(this.buscar_dado);

                } else if (item.conteudo.match(this.buscar_dado)) {

                    return item.conteudo.match(this.buscar_dado);

                } else if (item.tags[0].match(this.buscar_dado)) {

                    return item.tags[0].match(this.buscar_dado);

                } else if (item.tags[1].match(this.buscar_dado)) {

                    return item.tags[1].match(this.buscar_dado);

                } else if (item.tags[2].match(this.buscar_dado)) {

                    return item.tags[2].match(this.buscar_dado);
                }
            });
        }
    }
}