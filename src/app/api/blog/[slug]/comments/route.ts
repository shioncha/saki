import { D1Database } from '@cloudflare/workers-types';
import { Hono } from "hono";

export const runtime = "edge";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB: D1Database;
    }
  }
}

const app = new Hono().basePath('/api');

app.get('/blog/:slug/comments', async (c) => {
  const { slug } = c.req.param();
  const { results } = await process.env.DB.prepare(
    'SELECT yourName, yourEmail, comment, createdDate, createdTime FROM blogComments WHERE postId = ?'
  )
    .bind(slug)
    .all();

  return c.json(results);
})

app.post('/blog/:slug/comments', async (c) => {
  const { slug } = c.req.param();
  const { yourName, yourEmail, comment } = await c.req.json();
  const { success } = await process.env.DB.prepare(
    'INSERT INTO blogComments (postId, yourName, yourEmail, comment, createdDate, createdTime) VALUES (?, ?, ?, ?, ?, ?)'
  )
    .bind(slug, yourName, yourEmail, comment, new Date().toISOString().split('T')[0], new Date().toISOString().split('T')[1].split('.')[0])
    .run();

  return c.json({ id: success });
})

export const GET = app.fetch;
export const POST = app.fetch;
