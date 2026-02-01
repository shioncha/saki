import { Hono } from "hono";
import { csrf } from "hono/csrf";

import { SearchArticle, SearchResponse } from "@/types/article";

export const runtime = "edge";

const app = new Hono().basePath("/api");

app.get("/blog/search", csrf(), async (c) => {
  const query = c.req.query("q");
  const queries: object = {
    fields: "id,title,publishedAt",
    filters: "category[not_equals]page",
    limit: 12,
    q: query,
  };

  if (!query) return c.json<SearchArticle[]>([]);

  const getList = async (queries: object): Promise<SearchArticle[]> => {
    if (!process.env.MICROCMS_SERVICE_DOMAIN) return [];
    if (!process.env.MICROCMS_API_KEY) return [];
    if (!queries) return [];

    const entries: [string, string][] = Object.entries(queries);
    const parsedQueries = `?${entries
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join("&")}`;
    const url = `https://${process.env.MICROCMS_SERVICE_DOMAIN}.microcms.io/api/v1/blogs${parsedQueries}`;
    const res = await fetch(url, {
      headers: {
        "X-MICROCMS-API-KEY": process.env.MICROCMS_API_KEY,
      },
    });
    const json = (await res.json()) as SearchResponse;
    return json.contents;
  };

  const contents = await getList(queries);
  return c.json(contents);
});

export const GET = app.fetch;
