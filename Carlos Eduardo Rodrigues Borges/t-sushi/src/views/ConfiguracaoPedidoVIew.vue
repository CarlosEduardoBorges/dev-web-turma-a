<template>
  <div>
    <h1>Configuração do Pedido</h1>
    <pedido-component-vue :prato="pratoSelecionado" />
  </div>
</template>
<script>
import PedidoComponentVue from "@/components/PedidoComponent.vue";

export default {
  name: "ConfiguracaoPedidoView",
  components: {
    PedidoComponentVue,
  },
  data() {
    return {
      pratoSelecionado: null,
    };
  },
  mounted() {
    const query = this.$route.query;
    if (query.prato) {
      const decodePrato = JSON.parse(decodeURIComponent(query.prato));
      this.pratoSelecionado = decodePrato;
    }
  },
};
</script>
<style scoped></style>