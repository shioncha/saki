import { D1Database } from '@cloudflare/workers-types';
import { Hono } from "hono";

export const runtime = "edge";

type Bindings = {
  DB: D1Database
}

const app = new Hono<{ Bindings: Bindings }>().basePath('/api');

app.get('/blog/:slug/comments', async (c) => {
  const { slug } = c.req.param();
  const { results } = await c.env.DB.prepare(
    'SELECT yourName, yourEmail, comment, createdDate, createdTime FROM comments WHERE postId = ?'
  )
    .bind(slug)
    .all();

  return c.json(results);
})

app.post('/blog/:slug/comments', async (c) => {
  const { slug } = c.req.param();
  const { yourName, yourEmail, comment } = await c.req.json();
  const { success } = await c.env.DB.prepare(
    'INSERT INTO comments (postId, yourName, yourEmail, comment, createdDate, createdTime) VALUES (?, ?, ?, ?, ?, ?)'
  )
    .bind(slug, yourName, yourEmail, comment, new Date().toISOString().split('T')[0], new Date().toISOString().split('T')[1].split('.')[0])
    .run();

  return c.json({ id: success });
})

export const GET = app.fetch;
export const POST = app.fetch;
