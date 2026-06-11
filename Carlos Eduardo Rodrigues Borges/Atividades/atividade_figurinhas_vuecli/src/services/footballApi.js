const TOKEN = 'a63d28d61201f6e7ed72c85101439034';

const BASE_URL = 'https://v3.football.api-sports.io';

const cabecalho = {
  'x-apisports-key': TOKEN,
};

export const carregarPaises = async () => {
  const resposta = await fetch(`${BASE_URL}/teams/countries`, {
    method: 'GET',
    headers: cabecalho,
  });

  if (!resposta.ok) throw new Error(`Erro HTTP: ${resposta.status}`);

  const dados = await resposta.json();
  // Filtra apenas países que têm nome definido e ordena alfabeticamente
  return dados.response
    .filter((p) => p.name)
    .sort((a, b) => a.name.localeCompare(b.name));
};

// ── Endpoint 2 ──────────────────────────────────────────────
// GET /teams?name={nomePais} → retorna o ID numérico da equipe
export const buscarIdTime = async (nomePais) => {
  const resposta = await fetch(
    `${BASE_URL}/teams?name=${encodeURIComponent(nomePais)}`,
    {
      method: 'GET',
      headers: cabecalho,
    }
  );

  if (!resposta.ok) throw new Error(`Erro HTTP: ${resposta.status}`);

  const dados = await resposta.json();

  if (!dados.response || dados.response.length === 0) {
    throw new Error(`Seleção "${nomePais}" não encontrada na API.`);
  }

  // Extrai o ID numérico: ex. dadosTime.response[0].team.id → 6
  return dados.response[0].team.id;
};

// ── Endpoint 3 ──────────────────────────────────────────────
// GET /players/squads?team={teamId} → retorna o plantel completo
export const buscarPlantel = async (teamId) => {
  const resposta = await fetch(`${BASE_URL}/players/squads?team=${teamId}`, {
    method: 'GET',
    headers: cabecalho,
  });

  if (!resposta.ok) throw new Error(`Erro HTTP: ${resposta.status}`);

  const dados = await resposta.json();

  if (!dados.response || dados.response.length === 0) {
    throw new Error('Plantel não encontrado para este time.');
  }

  // Cada jogador tem: { id, name, age, number, position, photo }
  return dados.response[0].players;
};