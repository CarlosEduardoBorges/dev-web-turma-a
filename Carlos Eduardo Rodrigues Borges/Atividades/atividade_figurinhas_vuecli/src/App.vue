<!-- src/App.vue -->
<template>
  <div id="app">

    <!-- ╔══ CABEÇALHO ══════════════════════════════════════════╗ -->
    <header class="cabecalho">
      <h1>🏆 Álbum de Figurinhas</h1>
      <p>Seleções de Futebol Mundial</p>
    </header>

    <!-- ╔══ ÁREA DE SELEÇÃO ════════════════════════════════════╗ -->
    <main class="conteudo">
      <div class="selecao-wrapper">
        <label for="pais-select" class="selecao-label">
          Escolha uma Seleção:
        </label>

        <!--
          v-model → liga paisSelecionado ao valor escolhido
          @change → dispara carregarFigurinhas() ao mudar opção
          :disabled → desativa durante o carregamento dos países
        -->
        <select
          id="pais-select"
          v-model="paisSelecionado"
          @change="carregarFigurinhas"
          :disabled="carregandoPaises"
          class="selecao-dropdown"
        >
          <option value="">
            {{ carregandoPaises ? '⏳ Carregando países...' : '— Selecione um país —' }}
          </option>

          <!-- v-for percorre o array de países retornado pelo Endpoint 1 -->
          <option
            v-for="pais in listaPaises"
            :key="pais.code || pais.name"
            :value="pais.name"
          >
            {{ pais.name }}
          </option>
        </select>
      </div>

      <!-- ── Estado: carregando jogadores ── -->
      <div v-if="carregandoJogadores" class="estado-loading">
        <div class="spinner"></div>
        <p>Buscando figurinhas de <strong>{{ paisSelecionado }}</strong>...</p>
      </div>

      <!-- ── Estado: erro ── -->
      <div v-else-if="mensagemErro" class="estado-erro">
        <span>❌</span>
        <p>{{ mensagemErro }}</p>
      </div>

      <!-- ── Estado: álbum preenchido ── -->
      <section v-else-if="listaJogadores.length > 0" class="album-section">
        <h2 class="album-titulo">
          {{ paisSelecionado }} —
          <span>{{ listaJogadores.length }} jogadores</span>
        </h2>

        <!--
          CSS Grid responsivo:
          repeat(auto-fill, minmax(160px, 1fr)) cria colunas
          automaticamente de acordo com a largura da tela
        -->
        <div class="album-grid">
          <PlayerCard
            v-for="jogador in listaJogadores"
            :key="jogador.id"
            :jogador="jogador"
          />
        </div>
      </section>

      <!-- ── Estado: nenhuma seleção ainda ── -->
      <div v-else-if="!carregandoPaises" class="estado-vazio">
        <p>👆 Selecione uma seleção acima para revelar as figurinhas!</p>
      </div>
    </main>

  </div>
</template>

<script>
// Importa a Composition API do Vue 3
import { ref, onMounted } from 'vue';

// Importa o componente filho (card de cada jogador)
import PlayerCard from './components/PlayerCard.vue';

// Importa as três funções do serviço de API
import {
  carregarPaises,
  buscarIdTime,
  buscarPlantel,
} from './services/footballApi.js';

export default {
  name: 'App',

  // Registra o componente filho para uso no template
  components: {
    PlayerCard,
  },

  setup() {
    // ── Dados reativos ──────────────────────────────────────
    const listaPaises = ref([]);          // Array de países do Endpoint 1
    const paisSelecionado = ref('');      // Modelo do dropdown (v-model)
    const listaJogadores = ref([]);       // Array de jogadores do Endpoint 3
    const carregandoPaises = ref(false);  // Controla o skeleton do dropdown
    const carregandoJogadores = ref(false); // Controla o spinner do álbum
    const mensagemErro = ref('');         // Mensagem de erro visível ao usuário

    // ── Ciclo de vida: onMounted ────────────────────────────
    // Vue 3 equivale ao "created" / "mounted" do Vue 2
    // Carrega a lista de países assim que o componente monta
    onMounted(async () => {
      carregandoPaises.value = true;
      mensagemErro.value = '';

      try {
        listaPaises.value = await carregarPaises();
      } catch (erro) {
        mensagemErro.value =
          'Falha ao carregar os países. Verifique sua API Key.';
        console.error('[onMounted] Erro ao carregar países:', erro);
      } finally {
        // finally garante que o loading para, com ou sem erro
        carregandoPaises.value = false;
      }
    });

    // ── Função encadeada (Requisições 2 e 3) ───────────────
    // Disparada pelo evento @change do dropdown
    const carregarFigurinhas = async () => {
      // Guarda: se o usuário voltou para a opção vazia, limpa tudo
      if (!paisSelecionado.value) {
        listaJogadores.value = [];
        return;
      }

      carregandoJogadores.value = true;
      mensagemErro.value = '';
      listaJogadores.value = []; // Limpa o álbum anterior

      try {
        // 1ª Requisição: Endpoint 2 → descobre o ID numérico do time
        const teamId = await buscarIdTime(paisSelecionado.value);
        console.log(`[App] ID do time "${paisSelecionado.value}": ${teamId}`);

        // 2ª Requisição: Endpoint 3 → busca o plantel com o ID encontrado
        listaJogadores.value = await buscarPlantel(teamId);
        console.log(`[App] ${listaJogadores.value.length} jogadores carregados.`);
      } catch (erro) {
        mensagemErro.value =
          `Não foi possível carregar figurinhas de "${paisSelecionado.value}". ` +
          'Tente outra seleção ou verifique sua cota diária.';
        console.error('[carregarFigurinhas] Erro:', erro);
      } finally {
        carregandoJogadores.value = false;
      }
    };

    // Expõe para o template tudo que foi declarado no setup()
    return {
      listaPaises,
      paisSelecionado,
      listaJogadores,
      carregandoPaises,
      carregandoJogadores,
      mensagemErro,
      carregarFigurinhas,
    };
  },
};
</script>

<style>
/* ── Reset global ─────────────────────────────── */
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: #f0f7f0;
  color: #1b2e1b;
  min-height: 100vh;
}

/* ── Cabeçalho ────────────────────────────────── */
.cabecalho {
  background: linear-gradient(135deg, #1b5e20, #2e7d32);
  color: white;
  text-align: center;
  padding: 36px 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
}

.cabecalho h1 {
  font-size: clamp(1.6rem, 5vw, 2.4rem);
  font-weight: 800;
  letter-spacing: -0.5px;
}

.cabecalho p {
  margin-top: 6px;
  font-size: 1rem;
  opacity: 0.85;
}

/* ── Conteúdo principal ───────────────────────── */
.conteudo {
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 20px 60px;
}

/* ── Área de seleção ──────────────────────────── */
.selecao-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  margin-bottom: 36px;
}

.selecao-label {
  font-size: 1.1rem;
  font-weight: 600;
  color: #2e7d32;
}

.selecao-dropdown {
  padding: 12px 20px;
  font-size: 1rem;
  border: 2px solid #2e7d32;
  border-radius: 10px;
  background: white;
  color: #1b2e1b;
  cursor: pointer;
  width: min(320px, 100%);
  transition: border-color 0.2s;
  appearance: auto;
}

.selecao-dropdown:focus {
  outline: none;
  border-color: #1b5e20;
  box-shadow: 0 0 0 3px rgba(46, 125, 50, 0.2);
}

.selecao-dropdown:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* ── Estados de feedback ──────────────────────── */
.estado-loading,
.estado-erro,
.estado-vazio {
  text-align: center;
  padding: 60px 20px;
  font-size: 1.05rem;
  color: #4a5568;
}

.estado-erro {
  color: #c62828;
}

.estado-erro span {
  font-size: 2rem;
  display: block;
  margin-bottom: 10px;
}

/* Spinner de carregamento */
.spinner {
  width: 48px;
  height: 48px;
  border: 5px solid #c8e6c9;
  border-top-color: #2e7d32;
  border-radius: 50%;
  animation: girar 0.8s linear infinite;
  margin: 0 auto 16px;
}

@keyframes girar {
  to { transform: rotate(360deg); }
}

/* ── Seção do álbum ───────────────────────────── */
.album-titulo {
  text-align: center;
  font-size: 1.3rem;
  color: #1b5e20;
  margin-bottom: 24px;
}

.album-titulo span {
  color: #2e7d32;
  font-weight: 400;
}

/* CSS Grid responsivo — requisito 3 da atividade */
.album-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 20px;
}

/* ── Responsivo mobile ────────────────────────── */
@media (max-width: 480px) {
  .album-grid {
    grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
    gap: 14px;
  }
}
</style>
