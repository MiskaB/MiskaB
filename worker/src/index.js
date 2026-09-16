const CORS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: CORS });
    }

    const url = new URL(request.url);

    // GET /scores?game=tetris  →  top 10
    if (request.method === 'GET' && url.pathname === '/scores') {
      const game = url.searchParams.get('game') || 'tetris';
      const { results } = await env.DB.prepare(
        'SELECT player, score, created_at FROM scores WHERE game = ? ORDER BY score DESC LIMIT 10'
      ).bind(game).all();
      return new Response(JSON.stringify(results), { headers: CORS });
    }

    // POST /scores  →  add score
    if (request.method === 'POST' && url.pathname === '/scores') {
      let body;
      try { body = await request.json(); } catch {
        return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400, headers: CORS });
      }

      const { game, player, score } = body;

      if (!game || !player || typeof score !== 'number') {
        return new Response(JSON.stringify({ error: 'Missing fields' }), { status: 400, headers: CORS });
      }
      if (player.length < 1 || player.length > 3) {
        return new Response(JSON.stringify({ error: 'Player name must be 1–3 characters' }), { status: 400, headers: CORS });
      }
      if (score < 0 || score > 9_999_999) {
        return new Response(JSON.stringify({ error: 'Score out of range' }), { status: 400, headers: CORS });
      }

      await env.DB.prepare(
        'INSERT INTO scores (game, player, score) VALUES (?, ?, ?)'
      ).bind(game, player.toUpperCase().substring(0, 3), Math.floor(score)).run();

      return new Response(JSON.stringify({ success: true }), { headers: CORS });
    }

    return new Response('Not found', { status: 404 });
  }
};
