import { getList } from "@/lib/microcms";
import { Hono } from "hono";
import { csrf } from "hono/csrf";
import { MicroCMSQueries } from "microcms-js-sdk";

export const runtime = "edge";

const app = new Hono().basePath('/api');

app.get('/blog/search', csrf(), async (c) => {
  const query = c.req.query('q');
  const queries: MicroCMSQueries = {
    fields: 'id,title,publishedAt',
    filters: 'category[not_equals]page',
    limit: 12,
    q: query,
  }
  const { contents } = await getList(queries);
  return c.json(contents);
})

export const GET = app.fetch;
