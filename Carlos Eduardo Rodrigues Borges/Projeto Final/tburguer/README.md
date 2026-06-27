# T-Sushi — Sistema de Pedidos Online

## 🔗 Links Principais

| Recurso | URL |
|---------|-----|
| Aplicação (Vercel) | https://tburguer-eta.vercel.app |
| API JSON Server (Render) | https://api-tsushi.onrender.com |
| Repositório no GitHub | https://github.com/CarlosEduardoBorges/dev-web-turma-a |

> ⚠️ **Atenção:** A API está no plano gratuito do Render. Na primeira abertura, os dados podem levar até ~50 segundos para carregar (cold start). Atualize a página se necessário.

---

## 📌 Visão Geral

O projeto partiu de um template de hamburgueria e foi adaptado para uma **sushiaria**, com substituição completa da identidade visual, nomenclatura e regras de negócio, preservando toda a arquitetura Vue 3 (Options API, Vue Router, `fetch`, `props`, `$emit`, diretivas e json-server).

### Alterações visuais

- Nome e banner substituídos pela identidade T-Sushi
- Paleta de cores japonesa (`#1a2744` azul-marinho + `#c0392b` vermelho)
- Imagens de pratos japoneses nos cards do catálogo

### Alterações estruturais no código

**1. Banco de dados (`db/db.json`) reescrito com dados da sushiaria:**

```json
{
  "pratos": [
    { "id": 1, "nome": "Salmão Grelhado", "preco": 39.90, "foto": "..." }
  ],
  "tipos_combo": [
    { "id": 1, "descricao": "Combinado" },
    { "id": 2, "descricao": "À la carte" },
    { "id": 3, "descricao": "Temaki" },
    { "id": 4, "descricao": "Barca" }
  ],
  "opcionais": {
    "acompanhamentos": [
      { "id": 1, "nome": "Missoshiru" },
      { "id": 2, "nome": "Guioza" }
    ],
    "bebidas": [
      { "id": 1, "nome": "Chá verde gelado" },
      { "id": 2, "nome": "Ramune" }
    ]
  },
  "status": [
    { "id": 1, "descricao": "Pedido em espera" },
    { "id": 2, "descricao": "Em produção" },
    { "id": 3, "descricao": "A caminho" },
    { "id": 4, "descricao": "Entregue" }
  ]
}
```

**2. Formulário (`PedidoComponent.vue`) adaptado para campos T-Sushi:**

```html
<select name="tipo-combo" id="tipo-combo" v-model="comboSelecionado">
  <option value="" selected>Selecione o combo</option>
  <option v-for="combo in listaTiposCombo" :key="combo.id" :value="combo">
    {{ combo.descricao }}
  </option>
</select>
```

---

## 🔔 Solução Técnica dos Alertas

Foi criado o componente reutilizável `AlertaComponent.vue`, que recebe duas `props` — `tipo` e `mensagem` — e usa diretivas Vue para controlar a exibição e a aparência de forma dinâmica.

### Como o componente funciona

A visibilidade é controlada por `v-if`: o bloco só é renderizado quando há uma mensagem. A classe CSS é aplicada dinamicamente via `:class`, concatenando `"alerta-"` com o valor da prop `tipo`:

```html
<!-- AlertaComponent.vue -->
<div v-if="mensagem" :class="['alerta', 'alerta-' + tipo]">
  <span class="alerta-icone">
    <span v-if="tipo === 'erro'">✕</span>
    <span v-else-if="tipo === 'aviso'">⚠</span>
    <span v-else-if="tipo === 'sucesso'">✔</span>
    <span v-else>ℹ</span>
  </span>
  <span class="alerta-mensagem">{{ mensagem }}</span>
</div>
```

```js
props: {
  tipo:     { type: String, default: "info" },
  mensagem: { type: String, default: "" }
}
```

### Como o componente é acionado no pai

Em `PedidoComponent.vue`, `tipoAlerta` e `mensagemAlerta` vivem no `data()`. A validação, feita no método `criarPedido`, altera essas propriedades — o que dispara a reatividade do Vue e exibe o alerta automaticamente, sem precisar de lógica extra no template:

```js
// data()
tipoAlerta: "",
mensagemAlerta: "",

// methods
async criarPedido(e) {
  e.preventDefault();

  if (!this.nomeCliente || !this.comboSelecionado) {
    this.tipoAlerta = "erro";
    this.mensagemAlerta = "Preencha o nome e o tipo de combo.";
    return; // bloqueia o envio para a API
  }

  await fetch(`${this.$apiUrl}/pedidos`, { method: "POST", ... });

  this.tipoAlerta = "sucesso";
  this.mensagemAlerta = "Pedido criado com sucesso!";

  setTimeout(() => this.$router.push("/pedidos"), 1500);
}
```

O componente é registrado e usado no template do pai via `:tipo` e `:mensagem` com binding reativo:

```html
<AlertaComponent :tipo="tipoAlerta" :mensagem="mensagemAlerta" />
```

### Quatro estados semânticos

| Tipo | Cor | Quando aparece |
|------|-----|----------------|
| `erro` | Vermelho | Campo obrigatório não preenchido |
| `aviso` | Laranja | Seleção pendente |
| `info` | Azul | Operação em andamento |
| `sucesso` | Verde | Pedido criado, atualizado ou excluído |

---

## 🛠️ Rodar Localmente

```bash
npm install

# Terminal 1 — banco de dados JSON
npm run bancojson

# Terminal 2 — servidor Vue
npm run serve
```

`.env.development` aponta para `http://localhost:3000`; `.env.production` aponta para a API no Render.

---

## 👨‍💻 Autor

Carlos Eduardo Rodrigues Borges — CEUB · Desenvolvimento Web · Turma A
