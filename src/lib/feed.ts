import { Feed } from 'feed';
import { getBlogList } from '@/lib/microcms';

export const generateRssFeed = async (): Promise<string> => {
    // フィードを生成
    const baseUrl ='localhost:3000'
    const feed = new Feed({
        title: 'mixne-dev',
        description: 'ガジェットやテックを中心に、しおんの思ったこと・感じたこと',
        id:baseUrl,
        link:baseUrl,
        language: 'ja',
        copyright: '© 2024 mixne',
        generator:baseUrl,
    });

    // ブログ一覧を取得
    const posts = await getBlogList();

    // フィードに追加
    posts.map((post) => {
        feed.addItem({
            title: post.title,
            description: "",
            content: post.content,
            image: post.eyecatch?.url,
            date: new Date(post.createdAt),
            id: `${baseUrl}/blog/${post.id}`,
            link: `${baseUrl}/blog/${post.id}`,
        });
    });

    return feed.rss2();
};