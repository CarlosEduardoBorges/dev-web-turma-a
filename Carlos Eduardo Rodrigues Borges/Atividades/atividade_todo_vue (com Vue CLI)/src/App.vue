<template>
  <div class="container">
    <h1>Lista de Tarefas</h1>

    <TarefaForm @adicionar="adicionarTarefa" />

    <ul>
      <TarefaItem
        v-for="(tarefa, index) in tarefas"
        :key="index"
        :tarefa="tarefa"
        @concluir="marcarConcluida(index)"
        @remover="removerTarefa(index)"
      />
    </ul>

    <p v-if="tarefas.length === 0">Nenhuma tarefa ainda.</p>
  </div>
</template>

<script>
import TarefaForm from './components/TarefaForm.vue'
import TarefaItem from './components/TarefaItem.vue'

export default {
  name: 'App',

  components: {
    TarefaForm,
    TarefaItem
  },

  data() {
    return {
      tarefas: []
    }
  },

  methods: {
    adicionarTarefa(texto) {
      this.tarefas.push({
        texto: texto,
        concluida: false
      })
    },

    marcarConcluida(index) {
      this.tarefas[index].concluida = !this.tarefas[index].concluida
    },

    removerTarefa(index) {
      this.tarefas.splice(index, 1)
    }
  }
}
</script>

<style>
body {
  font-family: Arial, sans-serif;
  background: #f0f0f0;
  padding: 0;
  margin: 0;
}

.container {
  max-width: 500px;
  margin: 40px auto;
  padding: 0 20px;
}

h1 {
  text-align: center;
}

ul {
  list-style: none;
  padding: 0;
}

p {
  color: gray;
  text-align: center;
}
</style>
