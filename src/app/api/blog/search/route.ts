import { Hono } from "hono";
import { csrf } from "hono/csrf";

export const runtime = "edge";

const app = new Hono().basePath('/api');

app.get('/blog/search', csrf(), async (c) => {
  const query = c.req.query('q');
  const queries: Object = {
    fields: 'id,title,publishedAt',
    filters: 'category[not_equals]page',
    limit: 12,
    q: query,
  }
  
  if (!query) return c.json([]);
  
  const getList = async (queries: Object) => {
    if (!process.env.MICROCMS_SERVICE_DOMAIN) return c.json([]);
    if (!process.env.MICROCMS_API_KEY) return c.json([]);
    if (!queries) return c.json([]);
    
    const entries: [string, string][] = Object.entries(queries);
    const parsedQueries = `?${entries.map(([key, value]) => `${key}=${encodeURIComponent(value)}`).join('&')}`;
    const url = `https://${process.env.MICROCMS_SERVICE_DOMAIN}.microcms.io/api/v1/blogs${parsedQueries}`;
    return await fetch(url, {
      headers: {
        'X-MICROCMS-API-KEY': process.env.MICROCMS_API_KEY,
      }
    }).then((res) => res.json());
  }

  const { contents } = await getList(queries);
  return c.json(contents);
})

export const GET = app.fetch;
