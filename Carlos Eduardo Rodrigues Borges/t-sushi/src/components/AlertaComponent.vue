<template>
  <div v-if="mensagem" :class="['alerta', 'alerta-' + tipo]">

    <span class="alerta-icone">
      <span v-if="tipo === 'erro'">✕</span>
      <span v-else-if="tipo === 'aviso'">⚠</span>
      <span v-else-if="tipo === 'sucesso'">✔</span>
      <span v-else>ℹ</span>
    </span>

    <span class="alerta-mensagem">{{ mensagem }}</span>

  </div>
</template>

<script>
export default {
  name: "AlertaComponent",
  props: {
    tipo: {
      type: String,
      default: "info"
    },
    mensagem: {
      type: String,
      default: ""
    }
  }
};
</script>

<style scoped>
.alerta {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  border-radius: 6px;
  border-left: 5px solid;
  margin: 12px 0;
  font-size: 0.95rem;
  font-weight: 500;
}

.alerta-icone {
  font-size: 1.1rem;
  flex-shrink: 0;
}

/* Vermelho — Erros de preenchimento ou ações inválidas */
.alerta-erro {
  background-color: #fde8e8;
  border-color: #c0392b;
  color: #7b1a1a;
}

/* Laranja — Alertas e avisos importantes */
.alerta-aviso {
  background-color: #fef3e2;
  border-color: #e67e22;
  color: #7a4000;
}

/* Azul — Informações contextuais e gerais */
.alerta-info {
  background-color: #e8f0fe;
  border-color: #2980b9;
  color: #1a3a5c;
}

/* Verde — Sucesso ao cadastrar, editar ou excluir */
.alerta-sucesso {
  background-color: #e8f5e9;
  border-color: #27ae60;
  color: #1a5c2a;
}
</style>