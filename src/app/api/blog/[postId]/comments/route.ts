import { getRequestContext } from "@cloudflare/next-on-pages";
import { D1Database } from "@cloudflare/workers-types";
import { Hono } from "hono";

export const runtime = "edge";

type Bindings = {
  DB: D1Database;
  SLACK_WEBHOOK_URL?: string;
  TURNSTILE_SECRET_KEY: string;
};

async function verifyTurnstile(token: string, secret: string, ip?: string) {
  const url = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
  const formData = new FormData();
  formData.append("secret", secret);
  formData.append("response", token);
  if (ip) {
    formData.append("remoteip", ip);
  }

  const result = await fetch(url, {
    body: formData,
    method: "POST",
  });

  const outcome = await result.json<{ success: boolean }>();
  return outcome.success;
}

const app = new Hono<{ Bindings: Bindings }>().basePath("/api");

app.get("/blog/:postId/comments", async (c) => {
  const { postId } = c.req.param();
  try {
    const { results } = await c.env.DB.prepare(
      "SELECT id, yourName, comment, createdAt FROM blogComments WHERE postId = ? ORDER BY createdAt ASC",
    )
      .bind(postId)
      .all();

    return c.json(results);
  } catch (e) {
    console.log("Comment Fetch Error:", e);
    return c.json([], { status: 500 });
  }
});

app.post("/blog/:postId/comments", async (c) => {
  const { postId } = c.req.param();
  const { yourName, yourEmail, comment, token } = await c.req.json();

  if (!yourName || !yourEmail || !comment) {
    return c.json({ id: null }, { status: 400 });
  }

  // Verify Turnstile token
  const secretKey = c.env.TURNSTILE_SECRET_KEY;
  if (!secretKey) {
    return c.json({ id: null }, { status: 500 });
  }

  const ip = c.req.header("CF-Connecting-IP") || undefined;
  const isValid = await verifyTurnstile(token, secretKey, ip);
  if (!isValid) {
    return c.json({ error: "Invalid Captcha" }, { status: 400 });
  }

  try {
    const result = await c.env.DB.prepare(
      "INSERT INTO blogComments (postId, yourName, yourEmail, comment, createdAt) VALUES (?, ?, ?, ?, ?) RETURNING id",
    )
      .bind(postId, yourName, yourEmail, comment, new Date().toISOString())
      .first<{ id: number }>();

    if (c.env.SLACK_WEBHOOK_URL) {
      const payload = {
        text: `**新しいコメントが投稿されました**\n記事ID: ${postId}\n名前: ${yourName}\nメールアドレス: ${yourEmail}\nコメント: ${comment}`,
      };

      c.executionCtx.waitUntil(
        fetch(c.env.SLACK_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }),
      );
    }

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
