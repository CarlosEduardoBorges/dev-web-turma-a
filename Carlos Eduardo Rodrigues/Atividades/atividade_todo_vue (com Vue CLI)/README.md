# Lista de Tarefas — Vue 3 (com Vue CLI)

Refatoração de uma lista de tarefas feita em JavaScript puro para Vue 3,
organizada em componentes utilizando Vue CLI.

## Como usar

1. Abra o terminal na pasta do projeto
2. Instale as dependências:

   npm install

3. Rode o servidor de desenvolvimento:

   npm run dev

4. Acesse no navegador: http://localhost:5173

## Funcionalidades

- Adicionar tarefa pelo campo de texto ou pressionando Enter
- Clicar na tarefa para marcar como concluída
- Botão "x" para remover a tarefa

## Estrutura do projeto

src/
├── main.js
├── App.vue
└── components/
├── TarefaForm.vue
└── TarefaItem.vue

- `App.vue` — componente principal, gerencia a lista de tarefas
- `TarefaForm.vue` — cuida do campo de entrada e botão de adicionar
- `TarefaItem.vue` — representa cada tarefa individualmente

## Tecnologias

- Vue 3
- Vite
