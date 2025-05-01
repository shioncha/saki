import { generateRssFeed } from "@/lib/feed";

export const dynamic = "force-static";

export async function GET() {
  return new Response(await generateRssFeed());
}
