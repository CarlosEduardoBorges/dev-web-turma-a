## ⚠️ Aviso Importante

A API está hospedada no plano gratuito do Render. Na primeira abertura do site, os itens do cardápio podem levar até ~50 segundos para carregar — o servidor entra em modo de suspensão após inatividade. Atualize a página se necessário.

## 🔗 Links Principais

| Recurso | URL |
|---------|-----|
| Aplicação (Vercel) | https://tburguer-eta.vercel.app |
| API (Render) | _em breve_ |
| Repositório Front-end | https://github.com/CarlosEduardoBorges/dev-web-turma-a |

## 📌 Visão Geral

Migração do modelo hamburgueria para sushiaria com substituição completa da identidade visual, nomenclatura, campos do formulário e regras de negócio, preservando toda a arquitetura Vue 3 (Options API, Vue Router, `fetch`, `props`, `$emit`, diretivas e json-server).

**Principais adaptações:**
- Identidade visual: nome T-Sushi, banner e paleta japonesa
- Cardápio com pratos, combinados limitados e opcionais
- Tipos de combo: Combinado, À la carte, Temaki, Barca
- Opcionais: Missoshiru, Guioza, Edamame
- Bebidas: Chá verde gelado, Refrigerante, Suco natural, Ramune
- Status de pedido: Pedido em espera → Em produção → A caminho → Entregue

## 🔔 Validação e Alertas

Componente reutilizável `AlertaComponent.vue` com quatro estados semânticos:

- 🔴 **Erro** — campo obrigatório não preenchido (ex: nome do cliente)
- 🟠 **Aviso** — seleção pendente (ex: tipo de combo não escolhido)
- 🔵 **Info** — operação em andamento
- 🟢 **Sucesso** — pedido criado, atualizado ou excluído com confirmação

A validação bloqueia o envio para a API enquanto campos obrigatórios estiverem incompletos.

## 🛠️ Rodar Localmente

```bash
# Instalar dependências
npm install

# Terminal 1 — banco de dados JSON
npm run bancojson

# Terminal 2 — servidor de desenvolvimento Vue
npm run serve
```

`.env.development` aponta para a API local (porta 3000); `.env.production` aponta para o Render.

## 🧩 Estrutura de Componentes

| Arquivo | Função |
|---------|--------|
| `NavBarComponent.vue` | Barra de navegação global |
| `BannerComponent.vue` | Banner da home |
| `AlertaComponent.vue` | Feedback semântico ao usuário |
| `PedidoComponent.vue` | Formulário de criação de pedido |
| `ListaPedidoComponent.vue` | Listagem e gerenciamento de pedidos |
| `MenuView.vue` | Catálogo de pratos com scroll horizontal |
| `ConfiguracaoPedidoVIew.vue` | Configuração detalhada do pedido |
| `PedidosView.vue` | Tela de acompanhamento de pedidos |

## 👨‍💻 Autor

Carlos Eduardo Rodrigues Borges — CEUB · Desenvolvimento Web · Turma A
