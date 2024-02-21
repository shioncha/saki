import { generateRssFeed } from '@/lib/feed';

export async function GET() {
    return new Response(await generateRssFeed());
}