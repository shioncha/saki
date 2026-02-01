import { getRequestContext } from "@cloudflare/next-on-pages";
import { D1Database } from "@cloudflare/workers-types";
import { Hono } from "hono";

export const runtime = "edge";

type Bindings = {
  DB: D1Database;
};

const app = new Hono<{ Bindings: Bindings }>().basePath("/api");

app.get("/blog/:slug/comments", async (c) => {
  const { slug } = c.req.param();
  try {
    const { results } = await c.env.DB.prepare(
      "SELECT id, yourName, comment, createdAt FROM blogComments WHERE postId = ? ORDER BY createdAt ASC",
    )
      .bind(slug)
      .all();

    return c.json(results);
  } catch (e) {
    console.log("Comment Fetch Error:", e);
    return c.json([], { status: 500 });
  }
});

app.post("/blog/:slug/comments", async (c) => {
  const { slug } = c.req.param();
  const { yourName, yourEmail, comment } = await c.req.json();

  if (!yourName || !yourEmail || !comment) {
    return c.json({ id: null }, { status: 400 });
  }

  try {
    const result = await c.env.DB.prepare(
      "INSERT INTO blogComments (postId, yourName, yourEmail, comment, createdAt) VALUES (?, ?, ?, ?, ?) RETURNING id",
    )
      .bind(slug, yourName, yourEmail, comment, new Date().toISOString())
      .first<{ id: number }>();

    return c.json({ id: result?.id ?? null });
  } catch (e) {
    console.log("Comment Insert Error:", e);
    return c.json({ id: null }, { status: 500 });
  }
});

async function handler(request: Request) {
  const { env, ctx } = getRequestContext();
  return app.fetch(request, env, ctx);
}

export const GET = handler;
export const POST = handler;
