<template>
  <div>
    <!-- ✅ PASSO 7 — alerta de ações da lista -->
    <AlertaComponent :tipo="tipoAlerta" :mensagem="mensagemAlerta" />

    <div id="pedidos-tabela">
      <div>
        <div id="pedidos-tabela-cabecalho">
          <div id="ordem-id">#ID</div>
          <div>Nome</div>
          <div>Prato</div>
          <div>Combo</div>
          <div>Acompanhamentos</div>
          <div>Status</div>
          <div id="div-acoes">Ações</div>
        </div>
      </div>
    </div>

    <div
      class="pedidos-tabela-linha"
      v-for="pedido in listaPedidosRealizados"
      :key="pedido.id"
    >
      <div id="ordem-numero">{{ pedido.id }}</div>
      <div>{{ pedido.nome }}</div>
      <div>{{ pedido.prato.nome }}</div>
      <div>{{ pedido.combo.descricao }}</div>
      <div>
        <ul>
          <li
            v-for="(acompanhamento, index) in pedido.acompanhamentos"
            :key="index"
          >
            {{ acompanhamento.nome }}
          </li>
        </ul>
        <div class="divider"></div>
        <ul>
          <li v-for="(bebida, index) in pedido.bebidas" :key="index">
            {{ bebida.nome }}
          </li>
        </ul>
      </div>
      <div>
        <select
          name="status"
          class="status"
          @change="atualizarStatusPedido($event, pedido.id)"
        >
          <option value="">Selecione</option>
          <option
            v-for="status in listaStatusPedido"
            :key="status.id"
            :value="status.id"
            :selected="status.id == pedido.statusId"
          >
            {{ status.descricao }}
          </option>
        </select>
      </div>
      <div id="div-acoes">
        <img
          @click="deletarPedido(pedido.id)"
          src="/img/icone_lixeira.png"
          width="35px"
          height="35px"
        />
      </div>
    </div>
  </div>
</template>

<script>
import AlertaComponent from "./AlertaComponent.vue";

export default {
  name: "ListaPedidoComponent",

  components: {
    AlertaComponent,
  },

  data() {
    return {
      listaPedidosRealizados: [],
      listaStatusPedido: [],
      // ✅ PASSO 7 — estado do alerta
      tipoAlerta: "",
      mensagemAlerta: "",
    };
  },

  methods: {
    async consultarPedidos() {
      const response = await fetch(`${this.$apiUrl}/pedidos`);
      const dados = await response.json();
      this.listaPedidosRealizados = dados;
    },

    async consultarStatusPedido() {
      const response = await fetch(`${this.$apiUrl}/status_pedido`);
      this.listaStatusPedido = await response.json();
    },

    async deletarPedido(id) {
      await fetch(`${this.$apiUrl}/pedidos/${id}`, {
        method: "DELETE",
      });

      // ✅ PASSO 7 — atualiza lista e exibe sucesso
      await this.consultarPedidos();
      this.tipoAlerta = "sucesso";
      this.mensagemAlerta = "Pedido removido com sucesso.";
    },

    async atualizarStatusPedido(event, idPedido) {
      const idPedidoAtualizado = event.target.value;
      const atualizaoJson = JSON.stringify({ statusId: idPedidoAtualizado });

      await fetch(`${this.$apiUrl}/pedidos/${idPedido}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: atualizaoJson,
      });

      // ✅ PASSO 7 — feedback de atualização
      this.tipoAlerta = "info";
      this.mensagemAlerta = "Status atualizado.";
    },
  },

  mounted() {
    this.consultarPedidos();
    this.consultarStatusPedido();
  },
};
</script>

<style scoped>
#pedidos-tabela {
  width: 100%;
  margin: 0 auto;
}

#pedidos-tabela-cabecalho,
#pedidos-tabela-linhas,
.pedidos-tabela-linha {
  display: flex;
  flex-wrap: wrap;
}

#pedidos-tabela-cabecalho {
  font-weight: bold;
  padding: 12px;
  border-bottom: 2px solid #1a2744;
}

#pedidos-tabela-cabecalho div,
.pedidos-tabela-linha div {
  width: 18%;
}

.pedidos-tabela-linha {
  width: 100%;
  padding: 12px;
  border-bottom: 1px dotted #1a2744;
}

#pedidos-tabela-cabecalho #ordem-id,
.pedidos-tabela-linha #ordem-numero,
.pedidos-tabela-linha #div-acoes,
#pedidos-tabela-cabecalho #div-acoes {
  width: 5%;
}
</style>