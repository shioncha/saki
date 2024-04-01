import { Feed } from 'feed';
import { getBlogList } from '@/lib/microcms';
import Metadata from '@/const/meta';
import { MicroCMSQueries } from 'microcms-js-sdk';

export const generateRssFeed = async (): Promise<string> => {
    // フィードを生成
    const feed = new Feed({
        title: Metadata.title,
        description: Metadata.description,
        id: Metadata.baseUrl,
        link: Metadata.baseUrl,
        language: 'ja',
        copyright: `© ${new Date().getFullYear()} ${Metadata.title}`,
        generator: Metadata.baseUrl,
    });

    // 記事の一覧を取得
    const quieries: MicroCMSQueries = {
        fields: 'id,title,content,eyecatch,createdAt,publishedAt',
        filters: 'category[not_equals]page',
    }
    const posts = await getBlogList(quieries);

    // 記事をフィードに追加
    posts.map((post) => {
        feed.addItem({
            title: post.title,
            description: "",
            content: post.content,
            image: post.eyecatch?.url,
            date: new Date(post.publishedAt || post.createdAt),
            id: `${Metadata.baseUrl}/blog/${post.id}`,
            link: `${Metadata.baseUrl}/blog/${post.id}`,
        });
    });

    return feed.rss2();
};
