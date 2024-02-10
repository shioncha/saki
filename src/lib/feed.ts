import { Feed } from 'feed';
import { getBlogList } from '@/lib/microcms';
import Metadata from '@/const/meta';

export const generateRssFeed = async (): Promise<string> => {
    // フィードを生成
    const feed = new Feed({
        title: Metadata.title,
        description: Metadata.description,
        id: Metadata.baseUrl,
        link: Metadata.baseUrl,
        language: 'ja',
        copyright: '© 2024 mixne',
        generator: Metadata.baseUrl,
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
            id: `${Metadata.baseUrl}/blog/${post.id}`,
            link: `${Metadata.baseUrl}/blog/${post.id}`,
        });
    });

    return feed.rss2();
};