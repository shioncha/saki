import { Hono } from "hono";
import { NextResponse } from "next/server";

export const runtime = "edge";

const app = new Hono();

app.get("/api/test", async(c) => {
    return NextResponse.json({ message: "Hello, World!" });
})

export const GET = app.fetch;