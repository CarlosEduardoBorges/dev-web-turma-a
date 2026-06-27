<template>
  <div>
    <!-- ✅ PASSO 6 — Alerta reativo (aparece/some conforme mensagemAlerta) -->
    <AlertaComponent :tipo="tipoAlerta" :mensagem="mensagemAlerta" />

    <form id="pedido-form" @submit="criarPedido($event)">
      <div>
        <p id="nome-prato-content">
          {{ prato && prato.nome ? prato.nome : "-" }}
        </p>
        <img
          id="foto-content"
          :src="prato && prato.foto ? prato.foto : ''"
        />
      </div>

      <div class="inputs" id="form-pedido">
        <label for="nome-cliente">Nome</label>
        <input
          type="text"
          v-model="nomeCliente"
          id="nome-cliente"
          name="nome-cliente"
          placeholder="Digite seu Nome"
        />
      </div>

      <div class="inputs">
        <label>Tipo de Combo</label>
        <select
          name="tipo-combo"
          id="tipo-combo"
          v-model="comboSelecionado"
        >
          <option value="" selected>Selecione o combo</option>
          <option
            v-for="combo in listaTiposCombo"
            :key="combo.id"
            :value="combo"
          >
            {{ combo.descricao }}
          </option>
        </select>
      </div>

      <div class="inputs">
        <label id="opcionais-titulo">Selecione os opcionais</label>
        <label id="opcionais-subtitulo">Acompanhamentos</label>

        <div
          class="checkbox-container"
          v-for="acompanhamento in listaAcompanhamentos"
          :key="acompanhamento.id"
        >
          <input
            type="checkbox"
            :name="acompanhamento.nome"
            :value="acompanhamento"
            v-model="listaAcompanamentosSelecionados"
          />
          <span>{{ acompanhamento.nome }}</span>
        </div>

        <label>Adicione uma bebida</label>

        <div
          class="checkbox-container"
          id="checkbox-container"
          v-for="bebida in listaBebidas"
          :key="bebida.id"
        >
          <input
            type="checkbox"
            :name="bebida.nome"
            :value="bebida"
            v-model="listaBebidasSelecionadas"
          />
          <span>{{ bebida.nome }}</span>
        </div>

        <div class="inputs">
          <input type="submit" class="submit-btn" value="Confirmar Pedido" />
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import AlertaComponent from "./AlertaComponent.vue";

export default {
  name: "PedidoComponent",

  // ✅ PASSO 6 — registra o filho
  components: {
    AlertaComponent,
  },

  props: {
    prato: null,
  },

  data() {
    return {
      listaTiposCombo: [],
      listaBebidas: [],
      listaAcompanhamentos: [],
      nomeCliente: "",
      comboSelecionado: "",
      listaAcompanamentosSelecionados: [],
      listaBebidasSelecionadas: [],
      // ✅ PASSO 6 — estado do alerta
      tipoAlerta: "",
      mensagemAlerta: "",
    };
  },

  methods: {
    async getTiposCombo() {
      const response = await fetch(`${this.$apiUrl}/tipos_combo`);
      const dados = await response.json();
      this.listaTiposCombo = dados;
    },

    async getOpcionais() {
      const response = await fetch(`${this.$apiUrl}/opcionais`);
      const dados = await response.json();
      this.listaAcompanhamentos = dados.acompanhamentos;
      this.listaBebidas = dados.bebidas;
    },

    async criarPedido(e) {
      e.preventDefault();

      // ✅ PASSO 6 — validação antes do POST
      if (!this.nomeCliente || !this.comboSelecionado) {
        this.tipoAlerta = "erro";
        this.mensagemAlerta = "Preencha o nome e o tipo de combo.";
        return;
      }

      const dadosPedido = {
        nome: this.nomeCliente,
        combo: this.comboSelecionado,
        bebidas: Array.from(this.listaBebidasSelecionadas),
        acompanhamentos: Array.from(this.listaAcompanamentosSelecionados),
        prato: this.prato,
        statusId: 5,
      };

      const dadosJson = JSON.stringify(dadosPedido);

      await fetch(`${this.$apiUrl}/pedidos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: dadosJson,
      });

      // ✅ PASSO 6 — feedback de sucesso + redirecionamento após 1.5s
      this.tipoAlerta = "sucesso";
      this.mensagemAlerta = "Pedido criado com sucesso!";

      setTimeout(() => {
        this.$router.push("/pedidos");
      }, 1500);
    },
  },

  mounted() {
    this.getTiposCombo();
    this.getOpcionais();
  },
};
</script>

<style scoped>
#foto-content {
  margin-bottom: 16px;
  border-radius: 16px;
  position: relative;
  z-index: -1;
  justify-content: center;
  width: 100%;
  height: 180px;
  object-fit: cover;
}

#nome-prato-content {
  font-size: 43px;
  font-weight: bold;
  text-align: start;
  margin-bottom: -90px;
  margin-left: 40px;
  color: antiquewhite;
  padding: 16px;
}

#form-pedido {
  max-width: 750px;
  margin: 0 auto;
}

.inputs {
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
}

label {
  font-weight: bold;
  margin-bottom: 16px;
  color: #222;
  padding: 5px 12px;
  flex-direction: start;
  display: flex;
  border-left: 4px solid #c0392b;
}

input,
select {
  padding: 12px;
  width: 300px;
  border: solid #222 1px;
  border-radius: 8px;
  height: 20px;
  font-size: 12px;
}

select {
  height: 45px;
}

#opcionais-titulo {
  width: 100%;
}

#opcionais-subtitulo {
  display: flex;
  align-items: flex-start;
  align-content: center;
  width: 100%;
  margin-bottom: 12px;
}

.checkbox-container span {
  margin-left: 6px;
  font-weight: bold;
}

.checkbox-container span,
.checkbox-container input {
  width: auto;
  height: 20px;
}

.submit-btn {
  background-color: #1a2744;
  color: #f5f0e8;
  font-weight: bold;
  border: none;
  font-size: 18px;
  border-radius: 12px;
  padding: 16px;
  margin: 0 auto;
  cursor: pointer;
  width: 100%;
  height: auto;
  transition: 0.5s;
}

.submit-btn:hover {
  background-color: #c0392b;
  color: #f5f0e8;
}
</style>