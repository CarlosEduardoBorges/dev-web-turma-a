<template>
  <li :class="{ concluida: tarefa.concluida }" @click.self="$emit('concluir')">
    {{ tarefa.texto }}
    <button class="fechar" @click="$emit('remover')">x</button>
  </li>
</template>

<script>
export default {
  name: 'TarefaItem',

  props: {
    tarefa: {
      type: Object,
      required: true
    }
  },

  emits: ['concluir', 'remover']
}
</script>

<style scoped>
li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
  background: white;
  border-radius: 6px;
  margin-bottom: 8px;
}

li.concluida {
  text-decoration: line-through;
  color: gray;
}

.fechar {
  background: none;
  border: none;
  color: red;
  font-size: 16px;
  cursor: pointer;
}
</style>
