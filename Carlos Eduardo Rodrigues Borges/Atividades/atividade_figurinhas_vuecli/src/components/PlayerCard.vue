<!-- src/components/PlayerCard.vue -->
<template>
  <div class="figurinha">
    <!-- Foto oficial do jogador retornada pela API -->
    <div class="figurinha-foto">
  <img
    :src="`https://wsrv.nl/?url=${encodeURIComponent(jogador.photo)}&w=160&h=155&fit=cover`"
    :alt="jogador.name"
    @error="usarFotoFallback"
  />
</div>

    <!-- Número da camisa (canto superior direito) -->
    <span class="figurinha-numero">{{ jogador.number || '?' }}</span>

    <!-- Informações do jogador -->
    <div class="figurinha-info">
      <p class="figurinha-nome">{{ jogador.name }}</p>
      <span :class="['figurinha-posicao', classePosicao]">
        {{ abreviarPosicao(jogador.position) }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PlayerCard',

  props: {
    jogador: {
      type: Object,
      required: true,
      // Garante que o objeto tem a forma esperada da API
    },
  },

  methods: {
    // Fallback caso a imagem da API não carregue
    usarFotoFallback(evento) {
      evento.target.src =
        'https://media.api-sports.io/football/players/default.png';
    },

    // Abrevia a posição para o card ficar mais compacto
    abreviarPosicao(posicao) {
      const mapa = {
        Goalkeeper: 'GOL',
        Defender: 'DEF',
        Midfielder: 'MEI',
        Attacker: 'ATA',
      };
      return mapa[posicao] || posicao;
    },
  },

  computed: {
    // Adiciona classe CSS de cor de acordo com a posição
    classePosicao() {
      const mapa = {
        Goalkeeper: 'pos-gol',
        Defender: 'pos-def',
        Midfielder: 'pos-mei',
        Attacker: 'pos-ata',
      };
      return mapa[this.jogador.position] || '';
    },
  },
};
</script>

<style scoped>
.figurinha {
  position: relative;
  background: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  cursor: default;
}

.figurinha:hover {
  transform: translateY(-6px) scale(1.02);
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.2);
}

/* Foto */
.figurinha-foto {
  width: 100%;
  height: 155px;
  background: linear-gradient(135deg, #e8f5e9, #c8e6c9);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.figurinha-foto img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Número da camisa */
.figurinha-numero {
  position: absolute;
  top: 8px;
  right: 10px;
  background: rgba(0, 0, 0, 0.55);
  color: #fff;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 2px 7px;
  border-radius: 20px;
}

/* Área de informações */
.figurinha-info {
  padding: 10px 12px 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}

.figurinha-nome {
  font-size: 0.85rem;
  font-weight: 700;
  text-align: center;
  color: #1b2e1b;
  line-height: 1.2;
  margin: 0;
}

/* Badge de posição */
.figurinha-posicao {
  font-size: 0.7rem;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: 20px;
  letter-spacing: 0.05em;
  color: white;
}

.pos-gol { background: #f59e0b; }
.pos-def { background: #3b82f6; }
.pos-mei { background: #10b981; }
.pos-ata { background: #ef4444; }
</style>