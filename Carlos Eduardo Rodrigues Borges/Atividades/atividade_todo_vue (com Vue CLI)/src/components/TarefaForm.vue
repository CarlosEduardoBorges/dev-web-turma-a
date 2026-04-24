<template>
  <div class="entrada">
    <input
      type="text"
      v-model="novaTarefa"
      placeholder="Nova tarefa..."
      @keyup.enter="enviar"
    />
    <button @click="enviar">Adicionar</button>
  </div>
</template>

<script>
export default {
  name: 'TarefaForm',

  emits: ['adicionar'],

  data() {
    return {
      novaTarefa: ''
    }
  },

  methods: {
    enviar() {
      if (this.novaTarefa.trim() === '') return
      this.$emit('adicionar', this.novaTarefa)
      this.novaTarefa = ''
    }
  }
}
</script>

<style scoped>
.entrada {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
}

input[type="text"] {
  flex: 1;
  padding: 8px;
  font-size: 15px;
}

button {
  padding: 8px 14px;
  cursor: pointer;
}
</style>
